/**
 * Form examples
 */
window.onload = function() {
    "use strict";

    var myForm = document.getElementById("myForm");
    var chooseColor = document.getElementById("chooseColor");

    var submitButton = document.getElementById("submitButton");

    chooseColor.addEventListener("change", function() {
        myForm.style.backgroundColor = chooseColor.value;
    });

    submitButton.addEventListener("click", function() {
        document.getElementById("firstnameResult").innerHTML =
            "Name: "
            + document.getElementById("firstname").value
            + " ";
        document.getElementById("lastnameResult").innerHTML =
            document.getElementById("lastname").value;
        document.getElementById("passwordResult").innerHTML =
            "Password: "
            + document.getElementById("password").value;
        document.getElementById("numberResult").innerHTML =
            "Chosen number: "
            + document.getElementById("number").value;
        document.getElementById("textareaResult").innerHTML =
            "Textmessage: "
            + document.getElementById("textarea").value;
    });

    console.log("Everything is ready.");
};
