const form = document.querySelector( 'form' );
const fullName = document.getElementById("name");
const senderEmail = document.getElementById("email");
const subject = document.getElementById("betreff");
const message = document.getElementById("nachricht");
const newsletterSubscriber = document.getElementById("newsletter-input");
const recieverEmail = "mmiizz9922@gmail.com"
const c500 = "#1296e5"
const c50 = "#f0f8ff"
const gray4 = "#666d72"
const secureToken = "59c9b20c-ba01-4039-a5af-56612d9c4c28"

// Funktion zum Einfügen von Zeilenumbrüchen
function formatMessage(msg) {
    const words = msg.split(' ');
    let formattedMessage = '';
    for (let i = 0; i < words.length; i++) {
        if (i > 0 && i % 10 === 0) formattedMessage += '<br>'; // Fügt nach jedem 10. Wort einen Zeilenumbruch ein
        formattedMessage += words[i] + ' ';
    }
    return formattedMessage.trim();
}

// Funktion zur Erstellung der Nachricht
function contactMessageBody(name, email, message) {
    const introduction = `<b>Diese Nachricht wurde auf der Contact Us Seite geschrieben:</b><br><br>`;
    return introduction + `Name: ${name}<br>Email: ${email}<br><br>Nachricht:<br>${formatMessage(message)}`;
}

function newsletterMessageBody(email) {
    const introduction = `<b>Neuer Abonent</b><br><br>`;
    return introduction + `Ein Kunde hat den Newsletter aboniert.<br>Email: ${email}`;
}

function sendMail(subject, bodyMessage) {
    Email.send({
        SecureToken: secureToken,
        To : recieverEmail,
        From : recieverEmail,
        Subject : subject,
        Body : bodyMessage,
        /*Attachments : [
            {
                name : "elbspeed_logo.png",
                path : "https://imgur.com/a/DifEYBP"
            }
        ]*/
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Email Versendet!",
                    text: "Eine Rückmeldung erhalten sie nach so schnell wie möglich",
                    icon: "success",
                    confirmButtonColor: c500,
                    background: c50,
                    color: gray4,
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Etwas ist schief gelaufen!",
                    footer: '<a href="kontakt.html">Kontaktieren mit uns aufnehmen?</a>',
                    confirmButtonColor: c500,
                    background: c50,
                    color: gray4,
                });
            }
        }
    );
}

function addNewsletterSubscriber(bodyMessage) {
    Email.send({
        SecureToken: secureToken,
        To : recieverEmail,
        From : recieverEmail,
        Subject : "Newsletter Abonent",
        Body : bodyMessage,
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Zum Newsltetter angemeldet!",
                    text: "Freuen sie sich auf neuigkeiten von uns",
                    icon: "success",
                    confirmButtonColor: c500,
                    background: c50,
                    color: gray4,
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Etwas ist schief gelaufen!",
                    footer: '<a href="kontakt.html">Kontaktieren mit uns aufnehmen?</a>',
                    confirmButtonColor: c500,
                    background: c50,
                    color: gray4,
                });
            }
        }
    );
}

// Fügt Event Listener zu jedem Formular auf der Seite hinzu
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Verhindert das normale Einreichen des Formulars

        if (form.id === "contact-form") {
            // Kontaktformular Logik
            const messageBody = contactMessageBody(fullName.value, senderEmail.value, message.value);
            sendMail(subject.value, messageBody);
        } else if (form.id === "newsletter-form") {
            // Newsletter-Formular Logik
            // Hier annehmen, dass `newsletterSubscriber.value` existiert und korrekt ist
            const messageBody = newsletterMessageBody(newsletterSubscriber.value);
            addNewsletterSubscriber(messageBody);
        }
    });
});
/**
// Warten bis das Dokument vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    const inventory = document.getElementById('inventory'); // Das Element mit der ID 'inventory'
    inventory.addEventListener('wheel', function(e) {
      // Verhindert das normale Scroll-Verhalten (vertikal)
    e.preventDefault();
      // Scrollt horizontal basierend auf der vertikalen Scroll-Richtung der Maus
      inventory.scrollLeft += e.deltaY * 2; // Die 2 ist ein Faktor für die Scroll-Geschwindigkeit, anpassbar
    }, {passive: false}); // 'passive: false' verhindert, dass die Seite scrollt, während wir unser eigenes Scroll-Verhalten definieren
}); */