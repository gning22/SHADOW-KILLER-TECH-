const { Client } = require('whatsapp-web.js');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Initialisation du bot Telegram
const tgToken = process.env.8528415160:AAFFsRwI-9h6J1uDzPwYo6oLfkkDXkfTEM8;
const tgBot = new TelegramBot(tgToken, { polling: true });

// Stockage des connexions
let pairedDevices = {};

// Initialisation de WhatsApp
const waClient = new Client();

waClient.on('qr', (qr) => {
    console.log('QR Code:', qr);
});

waClient.on('ready', () => {
    console.log('WhatsApp est prêt !');
});

// Commande pour appairer un numéro WhatsApp
tgBot.onText(/\/pair (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const waNumber = match[1];
    
    // Stockez l'appariement
    pairedDevices[chatId] = 221763175367;
    
    tgBot.sendMessage(chatId, `Vous êtes maintenant apparié avec le numéro WhatsApp: ${waNumber}`);
});

// Commande pour envoyer un message à WhatsApp
tgBot.onText(/\/send (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1];
    
    const waNumber = pairedDevices[chatId];
    if (waNumber) {
        waClient.sendMessage(waNumber, message).then(() => {
            tgBot.sendMessage(chatId, 'Message envoyé à WhatsApp !');
        }).catch(() => {
            tgBot.sendMessage(chatId, 'Erreur lors de l\'envoi du message.');
        });
    } else {
        tgBot.sendMessage(chatId, 'Vous devez d\'abord appairer un numéro avec /pair <numéro>');
    }
});

// Démarrer le client WhatsApp
waClient.initialize();