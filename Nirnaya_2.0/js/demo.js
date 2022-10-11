import { BioServer, enums, Listener, version } from "../libs/fbf.module";

let listener = undefined;
// Store connected devices information. We don't actively use it in this sample, but you might want to.
let devices = [];
// Ongoing capture information.
let inProgress = undefined;
// Last captured biometrics.
let captured = undefined;

let taxonomy = "80000:1:0:0:0:0:0:0";

const dom = {
    listenerStatus: document.querySelector("#listener-status"),
    devices: document.querySelector("#availableBiolocations"),
    log: document.querySelector("#output"),
    stop: document.querySelector("#stop"),
    snap: document.querySelector("#snap"),
    //snap3: document.querySelector("#snap3"),
    snap3: document.querySelector("#snap"),
    identify: document.querySelector("#identify"),
    verify: document.querySelector("#verify"),
    enroll: document.querySelector("#enroll"),
    captures: [
        document.querySelector("#capture0"),
        document.querySelector("#capture1"),
        document.querySelector("#capture2"),
        document.querySelector("#capture3"),
        document.querySelector("#capture4"),
    ],
    instructions: document.querySelector("#instructions"),
    qualities: [
        document.querySelector("#quality0"),
        document.querySelector("#quality1"),
        document.querySelector("#quality2"),
        document.querySelector("#quality3"),
        document.querySelector("#quality4"),
    ],
    bioServer: document.querySelector("#bioServer"),
    endpoint: document.querySelector("#endpoint"),
    personId: document.querySelector("#personId"),
};

const classes = {
    scan: "btn btn-info",
    stop: "btn btn-warning",
    snap: "btn btn-info",
    snap3: "btn btn-info",
    identify: "btn btn-info",
    verify: "btn btn-info",
    enroll: "btn btn-info",
};

const templateTypes = {
    UnknownFace: enums.templateTypes.MMStandard,
    UnknownPalmVeinEnroll: enums.templateTypes.FujitsuRFormat,
    UnknownPalmVeinCapture: enums.templateTypes.FujitsuRFormat,
    RightPalmVeinEnroll: enums.templateTypes.FujitsuRFormat,
    RightPalmVeinCapture: enums.templateTypes.FujitsuRFormat,
    LeftPalmVeinEnroll: enums.templateTypes.FujitsuRFormat,
    LeftPalmVeinCapture: enums.templateTypes.FujitsuRFormat,
};

function print(message) {
    dom.log.innerHTML = message + "<br />" + dom.log.innerHTML;
}

function listenerStatus(status) {
    dom.listenerStatus.innerHTML = ` FbF client v${version} --- Listener - ${status}`;
}

function instructions(message = "") {
    dom.instructions.innerHTML = message;
}

function getDevices() {
    return listener.getDevices()
        .then(availableDevices => {
            devices = availableDevices.reduce((output, d) => {
                return d.supportedPositions.reduce((output, position) => output.push({
                    id: d.id,
                    biometricType: d.biometricType,
                    displayName: d.displayName,
                    position,
                }) && output, output);
            }, []);
            buildOptions(dom.devices, devices, x => `${x.id}`, x => `${x.displayName}@${x.position}`);
            show("snap", "snap3");
            hide("stop");
        });
}

function streamSnap(captures) {
    displayCapture(captures);
}

function displayCapture(captures = [ undefined ]) {
    dom.captures.forEach((element, index) => {
        const capture = captures[index];
        if (!capture) {
            element.setAttribute("src", "");
            element.setAttribute("width", "");
            return dom.qualities[index].innerHTML = "";
        }
        const quality = path([ "template", "quality" ], capture);
        element.setAttribute("src", `data:image/bmp;base64,${capture.image.data}`);
        element.setAttribute("class", "scan-" + captures.length);
        capture.biolocation = capture.biolocation || "UnknownFinger";
        dom.qualities[index].innerHTML = quality ? `${capture.biolocation} - Quality score: ${quality}` : `${capture.biolocation} - No quality scoring`;
    });
}

window.start = function start() {
    listenerStatus("Not connected");
    hide("stop", "snap", "snap3");
    loadState();
    return window.connect();
};

window.connect = function connect() {
    listener = new Listener("ws://127.0.0.1:4530", consoleLog);
    listener.connect()
        .then(() => {
            listenerStatus("Connected");
            print("Connection to the listener established.");
            listener.socket.onclose = () => console.warn("Connection closed!");
        })
        .then(getDevices);
};

window.reset = function reset() {
    return disconnect()
        .then(() => {
            dom.log.innerHTML = "";
            dom.instructions.innerHTML = "";
            hide("bioServer");
            displayCapture();
            window.connect();
        });
};

window.snap = function snap() {
    
    var controlVal = localStorage.getItem("controlVal");
    consoleLog(controlVal);
    debugger;
    if (listener) {
        debugger
        //hide("snap", "snap3");
        //show("stop");
        displayCapture();
        //hide("bioServer");
        instructions();
        captured = [];

        const { deviceId, deviceLocation } = getSelectedDevice();
        inProgress = { biolocation: deviceLocation, id: deviceId };

        const segment = [ "BothIris", "UnknownTwoFinger", "UnknownFourFinger" ].includes(inProgress.biolocation);

        print(`Starting snap ${inProgress.biolocation} ${inProgress.id}`);

        const templateType = templateTypes[inProgress.biolocation] || enums.templateTypes.MMStandard;

        return listener.snap({
            biolocation: inProgress.biolocation,
            deviceIds: inProgress.id,
            refreshType: enums.refreshTypes.StreamResponse,
            templateType,
            imageType: enums.imageTypes.RefreshJPG,
            quality: true,
            markSubjectOnFrame: false,
            nFIQ: segment,
            segment,
        }, streamSnap, instructions).then(captures => {
            instructions("Capture complete.");
            if (captured[0]) {
                //hide("stop");
                //show("snap", "snap3");
                //showBioServerForm(inProgress.biolocation);
            }
            captured = captures;
            console.log(captured)
            print(captured)
            return window.stop().then(() => streamSnap(captures));
        });
    }
};

window.generalize = function generalize() {
    if (listener) {
        const { deviceId, deviceLocation } = getSelectedDevice();

        if (deviceLocation !== "UnknownFinger") {
            // In a real implementation, Generalize should be allowed for all single fingers
            // including fingers segmented from a 4 finger slap.
            return print("Generalize is only available for UnknownFinger");
        }

        hide("snap", "snap3");
        show("stop");
        displayCapture();
        hide("bioServer");
        captured = [];

        inProgress = { biolocation: deviceLocation, id: deviceId };
        const segment = [ "BothIris", "UnknownTwoFinger", "UnknownFourFinger" ].includes(inProgress.biolocation);

        print(`Starting snap 3 ${inProgress.biolocation} ${inProgress.id}`);
        instructions("Please snap finger 1/3.");

        const notifyProgress = snapped => instructions(`Please snap finger ${snapped.length + 1} / 3.`);

        return listener.snap3({
            biolocation: inProgress.biolocation,
            deviceIds: inProgress.id,
            refreshType: enums.refreshTypes.StreamResponse,
            templateType: enums.templateTypes.MMStandard,
            imageType: enums.imageTypes.RefreshJPG,
            quality: true,
            markSubjectOnFrame: true,
            nFIQ: segment,
            segment: false,
        }, notifyProgress, displayCapture).then(snapped => {
            instructions(`Successfully captured ${snapped.length} fingers. Generalization in progress...`);
            // Display only the last snapped finger. Still needs to be passed as an array though!
            streamSnap([ snapped[snapped.length - 1] ]);
            const bioServer = newBioServer();
            return bioServer.generalize(snapped);
        })
            .then(generalized => {
                if (!generalized.result) {
                    print("Generalization failed");
                    return instructions("Generalization failed");
                }
                // After generalization, we only want to rebuild an array of one biometric object
                const consolidated = [ { ...captured[0] } ];
                // And override the template with the generalized result.
                consolidated[0].template.template = generalized.result;
                streamSnap(consolidated);
                print("Generalization successful");
                instructions("Generalization successful");
            })
            .catch(error => {
                instructions(error.message);
                print(error.message);
            });
    }
};

window.stop = function stop() {
    if (inProgress) {
        hide("stop");
        show("snap", "snap3");
        return listener.stop({ biolocation: inProgress.biolocation })
            .then(() => {
                print(`Stopped capture ${inProgress.biolocation} ${inProgress.id}`);
                showBioServerForm(inProgress.biolocation);
                inProgress = undefined;
            });
    }
};

function getIdentificationResult(identified) {
    return identified && identified.status === "Identified"
        ? `${identified.status} - ${identified.personId} (match score: ${identified.matchScore})`
        : identified.status;
}

window.identify = function identify() {
    const forbidden = [
        "UnknownPalmVeinEnroll",
        "LeftPalmVeinEnroll",
        "RightPalmVeinEnroll",
    ];
    if (isCurrentCaptureForbidden("identify", forbidden)) {
        return;
    }
    const bioServer = newBioServer();
    saveState();
    return bioServer.identify(captured, { maxOnly: false })
        .then(identified => {
            console.log(identified);
            identified.forEach(i => print(getIdentificationResult(i)));
        })
        .catch(err => print(`An error occurred: ${err.message}`));
};

window.enroll = function enroll() {
    const forbidden = [
        "UnknownPalmVeinCapture",
        "LeftPalmVeinCapture",
        "RightPalmVeinCapture",
    ];
    if (isCurrentCaptureForbidden("enroll", forbidden)) {
        return;
    }

    const bioServer = newBioServer();
    saveState();
    return bioServer.enroll(captured, dom.personId.value)
        .then(enrolled => enrolled.forEach(i => print(i.status)))
        .catch(err => print(`An error occurred: ${err.message}`));
};

window.verify = function verify() {
    const forbidden = [
        "UnknownPalmVeinEnroll",
        "LeftPalmVeinEnroll",
        "RightPalmVeinEnroll",
    ];
    if (isCurrentCaptureForbidden("verify", forbidden)) {
        return;
    }

    const bioServer = newBioServer();
    saveState();
    return bioServer.verify(captured, dom.personId.value)
        .then(verified => print(verified.result === true ? "Verification OK" : "Id does not match template"))
        .catch(err => print(`An error occurred: ${err.message}`));
};

function isCurrentCaptureForbidden(action, forbiddenLocations) {
    const forbidden = captured.find(c => forbiddenLocations.includes(c.biolocation));
    if (forbidden) {
        instructions(`Unable to ${action} ${forbidden.biolocation}`);
        return true;
    }
    instructions();
}

function getSelectedDevice() {
    //const deviceId = dom.devices[dom.devices.selectedIndex].value;
    //const deviceText = dom.devices[dom.devices.selectedIndex].text;
    var selectedControlVal = localStorage.getItem("controlVal"); //console.log("selectedControlVal"+selectedControlVal);
    var i = 0;

    for (i = 0; i < dom.devices.length; i++) {
        //const selectedDevice = dom.devices[i].text.split("@");
        if (dom.devices[i].text == selectedControlVal) {
        break;
        }
    }

    debugger;
    var deviceId = dom === null || dom == undefined ? 0 : dom.devices[i].value;
    var deviceText = dom === null || dom === undefined ? null : dom.devices[i].text;
    var deviceParts = deviceText === null || deviceText === void 0 ? void 0 : deviceText.split("@");
    var deviceLocation = deviceParts != null ? deviceParts[(deviceParts === null || deviceParts === void 0 ? void 0 : deviceParts.length) - 1] : null;
    console.log("Device Id " + deviceId);
    return { deviceId, deviceLocation };
}

function disconnect() {
    if (!listener) {
        return Promise.resolve();
    }

    return listener.disconnect()
        .then(() => {
            listenerStatus("Disconnected");
            inProgress = undefined;
            print("Connection to the listener terminated.");
            clearOptions(dom.devices);
        });
}

function showBioServerForm(biolocation) {
    if (captured?.[0]?.templates?.[0]?.template) {
        show("bioServer");
        if (biolocation.includes("PalmVeinEnroll")) {
            show("enroll");
            return hide("identify", "verify");
        }
        if (biolocation.includes("PalmVeinCapture")) {
            show("identify", "verify");
            return hide("enroll");
        }

        return show("identify", "enroll");
    }

    print("No available capture, or insufficient quality");
}

function newBioServer() {
    return new BioServer( taxonomy, dom.endpoint.value, consoleLog);
}

// local storage

function saveState() {
    const toSave = {
        endpoint: dom.endpoint.value,
        personId: dom.personId.value,
    };
    if (localStorage) {
        localStorage.setItem("fbf-client", JSON.stringify(toSave));
    }
}

function loadState() {
    if (localStorage) {
        const json = localStorage.getItem("fbf-client");
        const localState = json && JSON.parse(json);
        if (localState) {
            localState.endpoint && (dom.endpoint.value = localState.endpoint);
            localState.personId && (dom.personId.value = localState.personId);
        }
    }
}

// utils

const identity = x => x;

function buildOptions(list, data, valueFunc = identity, innerFunc = identity) {
    clearOptions(list);
    data.forEach(item => {
        const option = document.createElement("option");
        option.setAttribute("value", valueFunc(item));
        option.innerText = innerFunc(item);
        list.appendChild(option);
    });
}

function clearOptions(list) {
    for (let i = list.length - 1; i >= 0; i--) {
        list.remove(i);
    }
}

function hide(...properties) {
    properties.forEach(property => {
        const element = dom[property];
        const cssClass = classes[property] || "";
        element.setAttribute("class", cssClass + " hidden");
    });
}

function show(...properties) {
    properties.forEach(property => {
        const element = dom[property];
        const cssClass = classes[property] || "";
        element.setAttribute("class", cssClass);
    });
}

function path(tokens, obj) {
    if (!obj) {
        return undefined;
    }
    let value = obj;
    for (const token of tokens) {
        value = value[token];
        if (!value) {
            return undefined;
        }
    }

    return value;
}

/** Wrapper over console.log to prevent IE 11 specific errors */
function consoleLog(component, level, ...rest) {
    // This if statement is only necessary if attempting to make the app IE compatible.
    if (console) {
        console[level](component, ...rest); // eslint-disable-line no-console
    }
}