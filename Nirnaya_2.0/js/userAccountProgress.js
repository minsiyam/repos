$( document ).ready(function() {
    var personal_section = document.getElementById("personal-fieldset");
    personal_section.classList.add("d-block");
    var image_section = document.getElementById("image-fieldset");
    image_section.classList.add("d-none");
    var biometric_section = document.getElementById("biometric-fieldset");
    biometric_section.classList.add("d-none");
    var retina_section = document.getElementById("retina-fieldset");
    retina_section.classList.add("d-none");
    var finish_section = document.getElementById("finish-fieldset");
    finish_section.classList.add("d-none");
});

function progressForward(section){
    if (section == "personal-fieldset"){
        $("#personal-fieldset").addClass('d-none');
        $("#personal-fieldset").removeClass('d-block');
        $("#image-fieldset").addClass('d-block');
    }
    if (section == "image-fieldset"){
        $("#image-fieldset").addClass('d-none');
        $("#image-fieldset").removeClass('d-block');
        $("#biometric-fieldset").addClass('d-block');
    }
    if (section == "biometric-fieldset"){
        // var personal_section = document.getElementById("personal-fieldset");
        $("#biometric-fieldset").addClass('d-none');
        $("#biometric-fieldset").removeClass('d-block');
        $("#retina-fieldset").addClass('d-block');
    }
    if (section == "retina-fieldset"){
        // var personal_section = document.getElementById("personal-fieldset");
        $("#retina-fieldset").addClass('d-none');
        $("#retina-fieldset").removeClass('d-block');
        $("#finish-fieldset").addClass('d-block');
    }
}
