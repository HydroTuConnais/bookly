"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
const resend_1 = require("resend");
const resend = new resend_1.Resend("re_bCc5YBBN_3p1DbwcwRvTErkpnW55oDQtx");
async function changeEmail(previousemail, newemail, username, link, requestip, requestlocation) {
    if (!previousemail || !username) {
        console.error('Missing email or username, required parameters');
        return;
    }
    await resend.emails.send({
        from: 'send@bookly.ovh',
        to: previousemail,
        subject: 'Email Change Confirmation',
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmation Email</title>
                <style>
                    body {
                        background-color: #ffffff;
                        font-family: sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                    }
                    .container {
                        border: 1px solid #eaeaea;
                        border-radius: 8px;
                        padding: 20px;
                        max-width: 465px;
                        margin: 40px auto;
                    }
                    .section {
                        margin-top: 32px;
                    }
                    .logo {
                        display: block;
                        margin: 0 auto;
                    }
                    .heading {
                        color: #000000;
                        font-size: 24px;
                        font-weight: normal;
                        text-align: center;
                        margin: 30px 0;
                    }
                    .text {
                        color: #000000;
                        font-size: 14px;
                        line-height: 24px;
                        margin: 0;
                    }
                    .text-center {
                        text-align: center;
                    }
                    .button {
                        background-color: #000000;
                        color: #ffffff;
                        font-size: 12px;
                        font-weight: 600;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        display: inline-block;
                    }
                    .footer-text {
                        color: #666666;
                        font-size: 12px;
                        line-height: 24px;
                    }
                    .text-black {
                        color: #000000;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="section">
                        <img 
                            src="https://i.ibb.co/p0SGXLR/logo.png" 
                            alt="Bookly" 
                            width="100" 
                            height="100" 
                            class="logo"
                        />
                        <h1 class="text-center" style="font-size: 25px;">Bookly</h1>
                    </div>
                    <h2 class="heading">Confirmez votre nouvelle adresse email</h2>
                    <p class="text">Bonjour <strong>${username}</strong>,</p>
                    <p class="text">
                        Nous avons reçu une demande de changement d'adresse email vers <strong>${newemail}</strong>. 
                        Pour confirmer ce changement, veuillez cliquer sur le bouton ci-dessous.
                    </p>
                    <div class="section text-center">
                        <a href="${link}" class="button">Confirmer le changement d'email</a>
                    </div>
                    <p class="footer-text">
                        Cette demande a été effectuée depuis l'adresse IP 
                        <span class="text-black">${requestip}</span> à 
                        <span class="text-black">${requestlocation}</span>.
                        Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.
                    </p>
                </div>
            </body>
            </html>

        `
    });
}
;
async function changePassword(previousemail, username, link, requestip, requestlocation) {
    if (!previousemail || !username) {
        console.error('Missing email or username, required parameters');
        return;
    }
    await resend.emails.send({
        from: 'send@bookly.ovh',
        to: previousemail,
        subject: 'Email Change Confirmation',
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmation Email</title>
                <style>
                    body {
                        background-color: #ffffff;
                        font-family: sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                    }
                    .container {
                        border: 1px solid #eaeaea;
                        border-radius: 8px;
                        padding: 20px;
                        max-width: 465px;
                        margin: 40px auto;
                    }
                    .section {
                        margin-top: 32px;
                    }
                    .logo {
                        display: block;
                        margin: 0 auto;
                    }
                    .heading {
                        color: #000000;
                        font-size: 24px;
                        font-weight: normal;
                        text-align: center;
                        margin: 30px 0;
                    }
                    .text {
                        color: #000000;
                        font-size: 14px;
                        line-height: 24px;
                        margin: 0;
                    }
                    .text-center {
                        text-align: center;
                    }
                    .button {
                        background-color: #000000;
                        color: #ffffff;
                        font-size: 12px;
                        font-weight: 600;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        display: inline-block;
                    }
                    .footer-text {
                        color: #666666;
                        font-size: 12px;
                        line-height: 24px;
                    }
                    .text-black {
                        color: #000000;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="section">
                        <img 
                            src="https://i.ibb.co/p0SGXLR/logo.png" 
                            alt="Bookly" 
                            width="100" 
                            height="100" 
                            class="logo"
                        />
                        <h1 class="text-center" style="font-size: 25px;">Bookly</h1>
                    </div>
                    <h2 class="heading">Confirmez votre nouveau mots de passe.</h2>
                    <p class="text">Bonjour <strong>${username}</strong>,</p>
                    <p class="text">
                        Nous avons reçu une demande de modification de mots de passse. 
                        Pour confirmer ce changement, veuillez cliquer sur le bouton ci-dessous.
                    </p>
                    <div class="section text-center">
                        <a href="${link}" class="button">Forumulaire de changement de mots de passe</a>
                    </div>
                    <p class="footer-text">
                        Cette demande a été effectuée depuis l'adresse IP 
                        <span class="text-black">${requestip}</span> à 
                        <span class="text-black">${requestlocation}</span>.
                        Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.
                    </p>
                </div>
            </body>
            </html>

        `
    });
}
;
//# sourceMappingURL=resend.js.map