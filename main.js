"use strict";
const { default: makeWASocket, DisconnectReason, useSingleFileAuthState, makeInMemoryStore, downloadContentFromMessage, jidDecode, generateForwardMessageContent, generateWAMessageFromContent } = require("@adiwajshing/baileys")
const fs = require("fs");
const chalk = require('chalk')
const PhoneNumber = require('awesome-phonenumber')
const logg = require('pino')
const { serialize, fetchJson, sleep, getBuffer } = require("./FUNCTION/myfunc");
const { nocache, uncache } = require('./FUNCTION/chache.js');
const { groupResponse_Welcome, groupResponse_Remove, groupResponse_Promote, groupResponse_Demote } = require('./FUNCTION/group.js')

let setting = JSON.parse(fs.readFileSync('./setting/config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

const memory = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
const conn = makeWASocket({
printQRInTerminal: true,
logger: logg({ level: 'fatal' }),
browser: ['AtakBot MD','Safari','1.0.0'],
auth: state
})
memory.bind(conn.ev)

conn.ev.on('messages.upsert', async m => {
var msg = m.messages[0]
if (!m.messages) return;
if (msg.key && msg.key.remoteJid == "status@broadcast") return
msg = serialize(conn, msg)
msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
require('./atak')(conn, msg, m, setting, memory)
})

conn.ev.on('creds.update', () => saveState)

conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

conn.ws.on('CB:call', async (json) => {
const user_Call = json.content[0].attrs['call-creator']
conn.sendMessage(user_Call, { text: 'Maaf kamu terdeteksi telepon bot!\n5 detik lagi kamu akan,\ndiblokir otomatis oleh bot.'})
await sleep(5000)
conn.updateBlockStatus(user_Call, 'block')
})

// Setting
conn.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}
    
conn.getName = (jid, withoutContact  = false) => {
        jid = conn.decodeJid(jid)
        withoutContact = conn.withoutContact || withoutContact 
        let v
        if (jid.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = memory.contacts[jid] || {}
            if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = jid === '0@s.whatsapp.net' ? {
            jid,
            name: 'WhatsApp'
        } : jid === conn.decodeJid(conn.user.id) ?
            conn.user :
            (memory.contacts[jid] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
        
conn.setStatus = (status) => {
conn.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

conn.Contacts = async (jid, nomere, quoted = '', opts = {}) => {
let list = []
for (let i of nomore) {
list.push({
displayName: await conn.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(i + '@s.whatsapp.net')}\nFN:${await conn.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:atakbotzmd@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://https://www.instagram.com/atak_bot/?hl=id\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`})}
conn.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}	


conn.ev.on('connection.update', (update) => {
console.log('Connection update:', update)
if (update.connection === 'open') 
console.log("Connected with " + conn.user.id)
else if (update.connection === 'close')
connectToWhatsApp()
})

conn.ev.on('group-participants.update', async (update) =>{
groupResponse_Demote(conn, update)
groupResponse_Promote(conn, update)
groupResponse_Welcome(conn, update)
groupResponse_Remove(conn, update)
console.log(update)
})

conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

conn.downloadAndSaveMediaMessage = async(msg, type_file, path_file) => {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
  buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
}
}
return conn
}
connectToWhatsApp()
.catch(err => console.log(err))