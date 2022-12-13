
/*
Credit:
• Ridho( Pembuat Base ) 
• DikaArdnt ( MyFriend )
• AtakBot ( Pengembang Dan Pembuat Base )
*/

"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./FUNCTION/console.js')
const { getRandom, getGroupAdmins, runtime, sleep, makeid, fetchJson, getBuffer, formatp, parseMention } = require("./FUNCTION/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./FUNCTION/addlist');
const { jadibot, listJadibot } = require('./FUNCTION/jadibot') 

// bagian module
const fs = require("fs");
const os = require('os')
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const FileType = require('file-type')
const speed = require('performance-now')

// Response
const { stalkff } = require("./STALKER/stalk-ff");
const { stalkml } = require("./STALKER/stalk-ml");
const { npmstalk } = require("./STALKER/stalk-npm");
const { githubstalk } = require("./STALKER/stalk-gh");

// Cerita
const { cerpen } = require('./LIB/cerpen')

// Database
const setting = JSON.parse(fs.readFileSync('./SETTING/config.json'));
const antilink = JSON.parse(fs.readFileSync('./DATABASE/antilink.json'));
const mess = JSON.parse(fs.readFileSync('./SETTING/mess.json'));
const db_error = JSON.parse(fs.readFileSync('./DATABASE/error.json'));
const db_user = JSON.parse(fs.readFileSync('./DATABASE/pengguna.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./DATABASE/list.json'));
const DB_Tiktok = JSON.parse(fs.readFileSync('./DATABASE/tiktokAuto.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const hariiini = moment.tz('Asia/Jakarta').format('DD MMMM YYYY')
const barat = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const tengah = moment.tz('Asia/Makassar').format('HH:mm:ss')
const timur = moment.tz('Asia/Jayapura').format('HH:mm:ss')
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')  
if(time2 < "23:59:00"){
const ucapanWaktu = 'Selamat Malam 🌌'
 }
if(time2 < "19:00:00"){
const ucapanWaktu = 'Selamat Sore 🌃'
 }
if(time2 < "18:00:00"){
const ucapanWaktu = 'Selamat Sore 🌅'
 }
if(time2 < "15:00:00"){
const ucapanWaktu = 'Selamat Siang 🏙'
 }
if(time2 < "11:00:00"){
const ucapanWaktu = 'Selamat Pagi 🌄'
 }
if(time2 < "05:00:00"){
const ucapanWaktu = 'Selamat Pagi 🌉'
 } 
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6287721317870@s.whatsapp.net","6287721317870@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const text = args.join(" ")
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isAutoDownloadTT = DB_Tiktok.includes(from) ? true : false

// Doc
const filsj = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf']
const filsk = filsj[Math.floor(Math.random() * filsj.length)]
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

// auto read
conn.readMessages([msg.key])

const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}
const jsonformat = (json) => {
return JSON.stringify(json, null, 2)
}
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

// AUTO DOWNLOAD TIKTOK
if (isGroup && isAutoDownloadTT) {
if (chats.match(/(tiktok.com)/gi)){
reply('Url tiktok terdekteksi\nSedang mengecek data url.')
await sleep(3000)
var tt_res = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=SadTeams&url=${chats}`)
if (tt_res.status == 404) return reply('Gagal url tidak ditemukan')
var lagu_tt = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=SadTeams&url=${chats}`)
reply(`𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗

*Author:* Ridho
*Title:* ${tt_res.result.title}
*Durasi:* ${tt_res.result.duration}
*Username:* ${tt_res.result.author.username}
*Nickname:* ${tt_res.result.author.nickname}
*Source:* ${chats}

Video & Audio sedang dikirim...`)
conn.sendMessage(sender,{video:{url:tt_res.result.link}, caption:'No Watermark!'}, {quotes:msg})
conn.sendMessage(sender,{audio:lagu_tt, mimetype:'audio/mpeg', fileName:'tiktokMusic.mp3'}, {quotes:msg})
if (isGroup) return conn.sendMessage(from, {text:'Media sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
}
}

const Contact = (jid, numbers, name, quoted, men) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\nitem1.X-ABLabel:Owner Atak\nitem2.EMAIL;type=INTERNET:atakbotzmd@gmail.com\nitem2.X-ABLabel:Email\nitem3.ADR:;;🇮🇩Indonesia\nitem3.X-ABLabel:🌍Jakarta\nitem4.URL:https://instagram.com/atak.bot\n'
+ 'END:VCARD'
return conn.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : men ? men : []},{ quoted: quoted })
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

// FUNCTION ANTILINK
if (isGroup && isAntiLink) {
if (!isBotGroupAdmins) return reply('Untung Bot Bukan Admin')
var linkgce = await conn.groupInviteCode(from)
if (chats.includes(`https://chat.whatsapp.com/${linkgce}`)) {
reply(`\`\`\`「 Detect Link 」\`\`\`\n\nAnda tidak akan dikick bot karena yang anda kirim adalah link group yg ada di group ini`)
} else if (isUrl(chats)) {
let bvl = `\`\`\`「 Detect Link 」\`\`\`\n\nAdmin telah mengirim link, admin dibebaskan untuk mengirim link apapun`
if (isGroupAdmins) return reply(bvl)
if (fromMe) return reply(bvl)
if (isOwner) return reply(bvl)
await conn.sendMessage(from, { delete: msg.key })
mentions(`「 ANTILINK 」\n\n@${sender.split('@')[0]} Kamu mengirim link group, maaf bot akan kick kamu dari grup`, [sender])
await sleep(3000)
conn.groupParticipantsUpdate(from, [sender], "remove")
} else {
}
}

conn.getFile = async (path) => {
let rese
let date = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (rese = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
if (!Buffer.isBuffer(date)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(date) || {
mime: 'application/octet-stream',
ext: '.bin'
}
return {
rese,
...type,
date
}
}
conn.sendButton = async (
    jid,
    contentText,
    footer,
    buffer,
    buttons,
    quoted,
    options
  ) => {
    if (buffer)
      try {
        buffer = (await conn.getFile(buffer)).data;
      } catch {
        buffer = null;
      }
    let message = {
      ...options,
      ...(buffer
        ? { caption: contentText || "" }
        : { text: contentText || "" }),
      footer,
      buttons: buttons.map((btn) => {
        return {
          buttonId: btn[1] || btn[0] || "",
          buttonText: {
            displayText: btn[0] || btn[1] || "",
          },
        };
      }),
      ...(buffer ? { image: buffer } : {}),
    };
    return await conn.sendMessage(jid, message, {
      quoted,
      upload: conn.waUploadToServer,
      ...options,
    });
  }

let cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_user[x1].id }
if (satu == "name"){ return db_user[x1].name }
if (satu == "seri"){ return db_user[x1].seri }
if (satu == "premium"){ return db_user[x1].premium }
}
if (x1 == false) { return null } 
}

let setUser = (satu, dua, tiga) => { 
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){
if (satu == "±id"){ db_user[i].id = tiga
fs.writeFileSync('./DATABASE/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±name"){ db_user[i].name = tiga 
fs.writeFileSync('./DATABASE/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±seri"){ db_user[i].seri = tiga 
fs.writeFileSync('./DATABASE/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±premium"){ db_user[i].premium = tiga 
fs.writeFileSync('./DATABASE/pengguna.json', JSON.stringify(db_user))} 
}})
}

//Auto Block Nomor Luar Negeri
if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}

// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
// Bot Status
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})
switch(command) {
case 'menu':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const mark = '0@s.whatsapp.net'
const thumb = 'https://ibb.co/XW9m1Vx'
const create = 'Created By Atak'
const owner = '6287721317870@s.whatsapp.net'
const botName = 'AtakBot'
const ownerName = 'Ridho'
const running = 'termux'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮 @${mark.split("@")[0]}`
let menu_nya = `*── 「 ${botName} - MD Beta 」 ──*

            
_*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_👋🏻

「 IᑎᖴO ᗷOT 」
• 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎 : ${botName}
• 𝙾𝚠𝚗𝚎𝚛 𝙽𝚞𝚖𝚋𝚎𝚛 : Private
• 𝙾𝚠𝚗𝚎𝚛 𝙽𝚊𝚖𝚎 : ${ownerName}
• 𝚁𝚞𝚗𝚝𝚒𝚖𝚎 : ${runtime(process.uptime())}
• 𝙿𝚛𝚎𝚖𝚒𝚞𝚖 : (${cekUser("premium", sender)? '✓':'✘'})
• 𝚁𝚞𝚗𝚗𝚒𝚗𝚐 𝙾𝚗 : ${running}

「 IᑎᖴO ᑌᔕEᖇ 」
• 𝙽𝚊𝚖𝚊 : ${pushname}
• 𝙽𝚞𝚖𝚋𝚎𝚛 : @${sender.split('@')[0]}
• 𝚃𝚎𝚛𝚍𝚊𝚏𝚝𝚊𝚛 : ${("id", db_user).length}

「 ᗯᗩKTᑌ IᑎᗪOᑎEᔕIᗩ 」
• 𝙷𝚊𝚛𝚒 𝙸𝚗𝚒 : ${hariini}
• 𝚃𝚒𝚖𝚎 ${barat} 𝚆𝙸𝙱
• 𝚃𝚒𝚖𝚎 ${tengah} 𝚆𝙸𝚃𝙰
• 𝚃𝚒𝚖𝚎 ${timur} 𝚆𝙸𝚃
${strip_ny}
 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}error
 ⑅⃝🐋  ${prefix}server
 ⑅⃝🐋  ${prefix}infouser
 ⑅⃝🐋  ${prefix}runtime
 ⑅⃝🐋  ${prefix}ping
 ⑅⃝🐋  ${prefix}session
 ⑅⃝🐋  ${prefix}resetdb
 ⑅⃝🐋  ${prefix}addprem
 ⑅⃝🐋  ${prefix}delprem
 ⑅⃝🐋  ${prefix}broadcast
 ⑅⃝🐋  ${prefix}dashboard
 
 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}owner
 ⑅⃝🐋  ${prefix}script
 ⑅⃝🐋  ${prefix}ping
 ⑅⃝🐋  ${prefix}rules
 ⑅⃝🐋  ${prefix}menu
 ⑅⃝🐋  ${prefix}toimg
 ⑅⃝🐋  ${prefix}sticker
 ⑅⃝🐋  ${prefix}spamcall
 ⑅⃝🐋  ${prefix}jadibot
 ⑅⃝🐋  ${prefix}listjadibot
 ⑅⃝🐋  ${prefix}infoupdate
 ⑅⃝🐋  ${prefix}groupbot
 ⑅⃝🐋  ${prefix}biodataowner
 ⑅⃝🐋  ${prefix}donasi
 ⑅⃝🐋  ${prefix}thanksto

 𝐊𝐀𝐋𝐊𝐔𝐋𝐀𝐓𝐎𝐑 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}kali *angka angka*
 ⑅⃝🐋  ${prefix}bagi *angka angka*
 ⑅⃝🐋  ${prefix}kurang *angka angka*
 ⑅⃝🐋  ${prefix}tambah *angka angka*

 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}hidetag
 ⑅⃝🐋  ${prefix}tagall
 ⑅⃝🐋  ${prefix}fitnah
 ⑅⃝🐋  ${prefix}delete
 ⑅⃝🐋  ${prefix}revoke
 ⑅⃝🐋  ${prefix}linkgrup
 ⑅⃝🐋  ${prefix}setdesc
 ⑅⃝🐋  ${prefix}demote
 ⑅⃝🐋  ${prefix}antilink
 ⑅⃝🐋  ${prefix}promote
 ⑅⃝🐋  ${prefix}setppgrup
 ⑅⃝🐋  ${prefix}kick @tag
 ⑅⃝🐋  ${prefix}setnamegc
 ⑅⃝🐋  ${prefix}group open
 ⑅⃝🐋  ${prefix}group close
 ⑅⃝🐋  ${prefix}leave
 ⑅⃝🐋  ${prefix}add

 𝐒𝐓𝐎𝐑𝐄 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}list *<only grup>*
 ⑅⃝🐋  ${prefix}addlist *key@pesan*
 ⑅⃝🐋  ${prefix}dellist *<options>*
 ⑅⃝🐋  ${prefix}update *key@pesan*
 ⑅⃝🐋  ${prefix}proses *<reply orderan>*
 ⑅⃝🐋  ${prefix}done *<reply orderan>*

 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}tiktok

 𝐖𝐀𝐋𝐋𝐏𝐀𝐏𝐄𝐑 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}ppcouple 

 𝐒𝐓𝐀𝐋𝐊𝐄𝐑 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}ffstalk *id*
 ⑅⃝🐋  ${prefix}mlstalk *id|zone*
 ⑅⃝🐋  ${prefix}npmstalk *packname*
 ⑅⃝🐋  ${prefix}githubstalk *username* 

 𝐂𝐄𝐑𝐏𝐄𝐍 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}cerpen-anak
 ⑅⃝🐋  ${prefix}cerpen-bahasadaerah
 ⑅⃝🐋  ${prefix}cerpen-bahasainggris
 ⑅⃝🐋  ${prefix}cerpen-bahasajawa
 ⑅⃝🐋  ${prefix}cerpen-bahasasunda
 ⑅⃝🐋  ${prefix}cerpen-budaya
 ⑅⃝🐋  ${prefix}cerpen-cinta
 ⑅⃝🐋  ${prefix}cerpen-cintaislami
 ⑅⃝🐋  ${prefix}cerpen-cintapertama
 ⑅⃝🐋  ${prefix}cerpen-cintaromantis
 ⑅⃝🐋  ${prefix}cerpen-cintahsedih
 ⑅⃝🐋  ${prefix}cerpen-cintasegitiga
 ⑅⃝🐋  ${prefix}cerpen-cintasejati
 ⑅⃝🐋  ${prefix}cerpen-galau
 ⑅⃝🐋  ${prefix}cerpen-gokil
 ⑅⃝🐋  ${prefix}cerpen-inspiratif
 ⑅⃝🐋  ${prefix}cerpen-jepang
 ⑅⃝🐋  ${prefix}cerpen-kehidupan
 ⑅⃝🐋  ${prefix}cerpen-keluarga
 ⑅⃝🐋  ${prefix}cerpen-kisahnyata
 ⑅⃝🐋  ${prefix}cerpen-korea
 ⑅⃝🐋  ${prefix}cerpen-kristen
 ⑅⃝🐋  ${prefix}cerpen-liburan
 ⑅⃝🐋  ${prefix}cerpen-malaysia
 ⑅⃝🐋  ${prefix}cerpen-mengharukan
 ⑅⃝🐋  ${prefix}cerpen-misteri
 ⑅⃝🐋  ${prefix}cerpen-motivasi
 ⑅⃝🐋  ${prefix}cerpen-nasihat
 ⑅⃝🐋  ${prefix}cerpen-nasionalisme
 ⑅⃝🐋  ${prefix}cerpen-olahraga
 ⑅⃝🐋  ${prefix}cerpen-patahhati
 ⑅⃝🐋  ${prefix}cerpen-penantian
 ⑅⃝🐋  ${prefix}cerpen-pendidikan
 ⑅⃝🐋  ${prefix}cerpen-pengalaman
 ⑅⃝🐋  ${prefix}cerpen-pengorbanan
 ⑅⃝🐋  ${prefix}cerpen-penyesalan
 ⑅⃝🐋  ${prefix}cerpen-perjuangan
 ⑅⃝🐋  ${prefix}cerpen-perpisahan
 ⑅⃝🐋  ${prefix}cerpen-persahabatan
 ⑅⃝🐋  ${prefix}cerpen-petualangan
 ⑅⃝🐋  ${prefix}cerpen-ramadhan
 ⑅⃝🐋  ${prefix}cerpen-remaja
 ⑅⃝🐋  ${prefix}cerpen-rindu
 ⑅⃝🐋  ${prefix}cerpen-rohani
 ⑅⃝🐋  ${prefix}cerpen-romantis
 ⑅⃝🐋  ${prefix}cerpen-sastra
 ⑅⃝🐋  ${prefix}cerpen-sedih
 ⑅⃝🐋  ${prefix}cerpen-sejarah

 𝐅𝐔𝐍 𝐌𝐄𝐍𝐔
 ⑅⃝🐋  ${prefix}memek 
 ⑅⃝🐋  ${prefix}bego 
 ⑅⃝🐋  ${prefix}goblok 
 ⑅⃝🐋  ${prefix}janda 
 ⑅⃝🐋  ${prefix}perawan 
 ⑅⃝🐋  ${prefix}babi 
 ⑅⃝🐋  ${prefix}tolol 
 ⑅⃝🐋  ${prefix}pinter 
 ⑅⃝🐋  ${prefix}pintar 
 ⑅⃝🐋  ${prefix}asu 
 ⑅⃝🐋  ${prefix}bodoh 
 ⑅⃝🐋  ${prefix}gay 
 ⑅⃝🐋  ${prefix}lesby 
 ⑅⃝🐋  ${prefix}bajingan 
 ⑅⃝🐋  ${prefix}jancok 
 ⑅⃝🐋  ${prefix}anjing 
 ⑅⃝🐋  ${prefix}ngentod 
 ⑅⃝🐋  ${prefix}ngentot 
 ⑅⃝🐋  ${prefix}monyet 
 ⑅⃝🐋  ${prefix}mastah 
 ⑅⃝🐋  ${prefix}newbie 
 ⑅⃝🐋  ${prefix}bangsat 
 ⑅⃝🐋  ${prefix}bangke 
 ⑅⃝🐋  ${prefix}sange 
 ⑅⃝🐋  ${prefix}sangean 
 ⑅⃝🐋  ${prefix}dakjal 
 ⑅⃝🐋  ${prefix}horny 
 ⑅⃝🐋  ${prefix}wibu 
 ⑅⃝🐋  ${prefix}puki 
 ⑅⃝🐋  ${prefix}peak 
 ⑅⃝🐋  ${prefix}pantex 
 ⑅⃝🐋  ${prefix}pantek 
 ⑅⃝🐋  ${prefix}setan 
 ⑅⃝🐋  ${prefix}iblis 
 ⑅⃝🐋  ${prefix}cacat 
 ⑅⃝🐋  ${prefix}yatim 
 ⑅⃝🐋  ${prefix}piatu 
 ⑅⃝🐋  ${prefix}goblokcek 
 ⑅⃝🐋  ${prefix}jelekcek 
 ⑅⃝🐋  ${prefix}gaycek 
 ⑅⃝🐋  ${prefix}rate 
 ⑅⃝🐋  ${prefix}lesbicek 
 ⑅⃝🐋  ${prefix}gantengcek 
 ⑅⃝🐋  ${prefix}cantikcek 
 ⑅⃝🐋  ${prefix}begocek 
 ⑅⃝🐋  ${prefix}suhucek 
 ⑅⃝🐋  ${prefix}pintercek 
 ⑅⃝🐋  ${prefix}jagocek 
 ⑅⃝🐋  ${prefix}nolepcek 
 ⑅⃝🐋  ${prefix}babicek 
 ⑅⃝🐋  ${prefix}bebancek 
 ⑅⃝🐋  ${prefix}baikcek 
 ⑅⃝🐋  ${prefix}jahatcek 
 ⑅⃝🐋  ${prefix}anjingcek 
 ⑅⃝🐋  ${prefix}haramcek 
 ⑅⃝🐋  ${prefix}pakboycek 
 ⑅⃝🐋  ${prefix}pakgirlcek 
 ⑅⃝🐋  ${prefix}sangecek 
 ⑅⃝🐋  ${prefix}bapercek 
 ⑅⃝🐋  ${prefix}fakboycek 
 ⑅⃝🐋  ${prefix}alimcek 
 ⑅⃝🐋  ${prefix}suhucek 
 ⑅⃝🐋  ${prefix}fakgirlcek 
 ⑅⃝🐋  ${prefix}kerencek 
 ⑅⃝🐋  ${prefix}wibucek 
 ⑅⃝🐋  ${prefix}pasarkascek 
 ⑅⃝🐋  ${prefix}kulcek                 
 ⑅⃝🐋  ${prefix}cekgoblok 
 ⑅⃝🐋  ${prefix}cekjelek 
 ⑅⃝🐋  ${prefix}cekgay                 
 ⑅⃝🐋  ${prefix}ceklesbi 
 ⑅⃝🐋  ${prefix}cekganteng 
 ⑅⃝🐋  ${prefix}cekcantik 
 ⑅⃝🐋  ${prefix}cekbego 
 ⑅⃝🐋  ${prefix}ceksuhu 
 ⑅⃝🐋  ${prefix}cekpinter 
 ⑅⃝🐋  ${prefix}cekjago 
 ⑅⃝🐋  ${prefix}ceknolep 
 ⑅⃝🐋  ${prefix}cekbabi 
 ⑅⃝🐋  ${prefix}cekbeban 
 ⑅⃝🐋  ${prefix}cekbaik 
 ⑅⃝🐋  ${prefix}cekjahat 
 ⑅⃝🐋  ${prefix}cekanjing 
 ⑅⃝🐋  ${prefix}cekharam 
 ⑅⃝🐋  ${prefix}cekpakboy 
 ⑅⃝🐋  ${prefix}cekpakgirl 
 ⑅⃝🐋  ${prefix}ceksange 
 ⑅⃝🐋  ${prefix}cekbaper 
 ⑅⃝🐋  ${prefix}cekfakboy 
 ⑅⃝🐋  ${prefix}cekalim 
 ⑅⃝🐋  ${prefix}ceksuhu 
 ⑅⃝🐋  ${prefix}cekfakgirl 
 ⑅⃝🐋  ${prefix}cekkeren 
 ⑅⃝🐋  ${prefix}cekwibu 
 ⑅⃝🐋  ${prefix}cekpasarkas 
 ⑅⃝🐋  ${prefix}cekkul 
 ⑅⃝🐋  ${prefix}cekbapak 

 𝐒𝐎𝐔𝐍𝐃 𝐌𝐄𝐍𝐔
 ⑅⃝🐋 ${prefix}sound1
 ⑅⃝🐋 ${prefix}sound2
 ⑅⃝🐋 ${prefix}sound3
 ⑅⃝🐋 ${prefix}sound4
 ⑅⃝🐋 ${prefix}sound5
 ⑅⃝🐋 ${prefix}sound6
 ⑅⃝🐋 ${prefix}sound7
 ⑅⃝🐋 ${prefix}sound8
 ⑅⃝🐋 ${prefix}sound9
 ⑅⃝🐋 ${prefix}sound10
 ⑅⃝🐋 ${prefix}sound11
 ⑅⃝🐋 ${prefix}sound12
 ⑅⃝🐋 ${prefix}sound13
 ⑅⃝🐋 ${prefix}sound14
 ⑅⃝🐋 ${prefix}sound15
 ⑅⃝🐋 ${prefix}sound16
 ⑅⃝🐋 ${prefix}sound17
 ⑅⃝🐋 ${prefix}sound18
 ⑅⃝🐋 ${prefix}sound19
 ⑅⃝🐋 ${prefix}sound20
 ⑅⃝🐋 ${prefix}sound21
 ⑅⃝🐋 ${prefix}sound22
 ⑅⃝🐋 ${prefix}sound23
 ⑅⃝🐋 ${prefix}sound24
 ⑅⃝🐋 ${prefix}sound25
 ⑅⃝🐋 ${prefix}sound26
 ⑅⃝🐋 ${prefix}sound27
 ⑅⃝🐋 ${prefix}sound28
 ⑅⃝🐋 ${prefix}sound29
 ⑅⃝🐋 ${prefix}sound30
 ⑅⃝🐋 ${prefix}sound31
 ⑅⃝🐋 ${prefix}sound32
 ⑅⃝🐋 ${prefix}sound33
 ⑅⃝🐋 ${prefix}sound34
 ⑅⃝🐋 ${prefix}sound35
 ⑅⃝🐋 ${prefix}sound36
 ⑅⃝🐋 ${prefix}sound37
 ⑅⃝🐋 ${prefix}sound38
 ⑅⃝🐋 ${prefix}sound39
 ⑅⃝🐋 ${prefix}sound40
 ⑅⃝🐋 ${prefix}sound41
 ⑅⃝🐋 ${prefix}sound42
 ⑅⃝🐋 ${prefix}sound43
 ⑅⃝🐋 ${prefix}sound44
 ⑅⃝🐋 ${prefix}sound45
 ⑅⃝🐋 ${prefix}sound46
 ⑅⃝🐋 ${prefix}sound47
 ⑅⃝🐋 ${prefix}sound48
 ⑅⃝🐋 ${prefix}sound49
 ⑅⃝🐋 ${prefix}sound50
 ⑅⃝🐋 ${prefix}sound51
 ⑅⃝🐋 ${prefix}sound52
 ⑅⃝🐋 ${prefix}sound53
 ⑅⃝🐋 ${prefix}sound54
 ⑅⃝🐋 ${prefix}sound55
 ⑅⃝🐋 ${prefix}sound56
 ⑅⃝🐋 ${prefix}sound57
 ⑅⃝🐋 ${prefix}sound58
 ⑅⃝🐋 ${prefix}sound59
 ⑅⃝🐋 ${prefix}sound60
 ⑅⃝🐋 ${prefix}sound61
 ⑅⃝🐋 ${prefix}sound62
 ⑅⃝🐋 ${prefix}sound63
 ⑅⃝🐋 ${prefix}sound64
 ⑅⃝🐋 ${prefix}sound65
 ⑅⃝🐋 ${prefix}sound66
 ⑅⃝🐋 ${prefix}sound67
 ⑅⃝🐋 ${prefix}sound68
 ⑅⃝🐋 ${prefix}sound69
 ⑅⃝🐋 ${prefix}sound70
 ⑅⃝🐋 ${prefix}sound71
 ⑅⃝🐋 ${prefix}sound72
 ⑅⃝🐋 ${prefix}sound73
 ⑅⃝🐋 ${prefix}sound74`
let buttonmenu = [
{buttonId: '#verify', buttonText: {displayText: '️VERIFY'}, type: 1},
{buttonId: '#owner', buttonText: {displayText: '️OWNER'}, type: 1},
{buttonId: '#thanksto', buttonText: {displayText: 'THANK TO'}, type: 1}
]

let buttonMessage = {
image: { url: './MEDIA/menu.jpg' },
caption: menu_nya,
footer: 'https://youtube.com/AtakBot',
buttons: buttonmenu,
headerType: 4
}
conn.sendMessage(from, 
{text: menu_nya, 
buttons: buttonmenu,
footer: footer_nya,
mentions: [setting.markNumber, sender]},
{quoted:msg})
}
break
case 'verify':{
if (cekUser("id", sender) !== null) return reply('Kamu sudah terdaftar !!')
var res_us = `${makeid(10)}`
var diacuk = `${db_user.length+1}`
var user_name = `atak${diacuk}`
let object_user = {"id": sender, "pushname": pushname, "seri": res_us, "premium": false}
db_user.push(object_user)
fs.writeFileSync('./DATABASE/pengguna.json', JSON.stringify(db_user))
mentions(`𝙼𝙴𝙼𝚄𝙰𝚃 𝙳𝙰𝚃𝙰 𝚄𝚂𝙴𝚁 @${sender.split("@")[0]}`, [sender])
await sleep(1500)
var verify_teks =`───「 𝐒𝐔𝐊𝐒𝐄𝐒 𝐕𝐄𝐑𝐈𝐅𝐈𝐊𝐀𝐒𝐈 」────

 ○ ID : @${sender.split('@')[0]}
 ○ Name : ${pushname}
 ○ Seri : ${res_us}
 ○ Premium : (${cekUser("premium", sender)? '✓':'✘'})
`
var buttonMessage = {
text: verify_teks,
footer: 'Klik button untuk melihat menu',
mentions: [sender],
buttons: [
{ buttonId: '#menu', buttonText: {displayText: '️MENU'}, type: 1}
],
headerType: 1
}
conn.sendMessage(from, buttonMessage, {quoted:msg})
await sleep(1000)
var teksss_verify =`REGISTER USER
 ⑅⃝🐋 Name : ${pushname}
 ⑅⃝🐋 ID : @${sender.split('@')[0]}
 ⑅⃝🐋 Seri : ${res_us}
 ⑅⃝🐋 Terdaftar : ${db_user.length}`
conn.sendMessage(`${setting.ownerNumber}`, {text:teksss_verify, mentions: [sender]})
}
break
case 'grupbot':
case 'groupbot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(`*Forum Bot Whatsapp*
https://chat.whatsapp.com/EXFg0Ah0zce5YM9Qs5u9hL`)
break
case 'infoupdate':
reply('TUNGGU DARI OWNER')
break
case 'script': case 'sc':
reply(`SCRIPT INI GK DI JUAL SCRIPT INI DI KEMBANGKAN OLEH OWNER SENDIRI`)
break
case 'rules':
reply(`# RULES BOT
1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*

2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*

3. Jangan mengejek bot.
Sanksi: *PERMANENT BLOCK*

4. Gpp sc gw jelek yg penting 
Bot gw jalan awokawoak
Jika sudah dipahami rules-nya, silakan ketik *#menu* untuk memulai!

Owner  BOT:
wa.me/6287721317870`) 
break 
case 'owner': case 'crator': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
conn.Contact(m.chat, global.ownerNumber, msg)
}
break
case 'bioadataowner': case 'biodata':
reply (`┍┈–––• *BIODATA OWNER*
┆⫹⫺ Nama : RIDHO
┆⫹⫺ Hobby : NGODING & ART
┆⫹⫺ Status : SINGLE
┆⫹⫺ Birthday : 18 - 11 - 2005
┆⫹⫺ Address : ISEKAI
└––––––––––––––––––·•
┍┈––––––• *SKILLS*
┆> JavaScript [30%]
┆> Html [38%]
┆> CSS [38%]
└––––––––––––––––––·•\n`) 
break
case 'runtime':
case 'tes':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(`*Runtime :* ${runtime(process.uptime())}`)
break

case 'thanksto':
case 'thanks':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser) 
reply (`𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎
𝐀𝐓𝐀𝐊 𝐁𝐎𝐓 ( 𝐏𝐄𝐌𝐁𝐔𝐀𝐓 𝐁𝐀𝐒𝐄 ) 
𝐃𝐇𝐀𝐍𝐈𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 ( 𝐌𝐘 𝐅𝐑𝐈𝐄𝐍𝐃𝐒 ) 
𝐀𝐊𝐈𝐑𝐀 ( 𝐌𝐘 𝐅𝐑𝐈𝐄𝐍𝐃𝐒 ) 
𝐈𝐑𝐅𝐀𝐍 ( 𝐌𝐘 𝐅𝐑𝐈𝐄𝐍𝐃𝐒 ) 
𝐊𝐀𝐇𝐅𝐈 ( 𝐌𝐘 𝐅𝐑𝐈𝐄𝐍𝐃𝐒 ) 
𝐈𝐐𝐁𝐀𝐋 ( 𝐌𝐘 𝐅𝐑𝐈𝐄𝐍𝐃𝐒 )
𝐓𝐔𝐇𝐀𝐍 𝐘𝐀𝐍𝐆 𝐌𝐀𝐇𝐀 𝐄𝐒𝐀
𝐎𝐑𝐀𝐍𝐆 𝐓𝐔𝐀`) 
break

case 'donasi':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser) 
reply(`DONASI :
GOPAY : 087721317865
OVO : 087721317870
PULSA : 087721317870`) 
break

// OWNER MENU
case 'resetdb':{
if (!isOwner) return reply(mess.OnlyOwner)
let para_kos = "[]"
db_user.splice(para_kos)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 1))
await sleep(1000)
db_error.splice(para_kos)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error, null, 1))
reply('Sukses restart database')
}
break
case 'chat':
case 'start':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var arr_rows = []
for (let i of db_user) {
arr_rows.push({
title: i.name,
rowId: ` ${prefix}start_conn ${i.id}|${sender}|${cekUser("name", sender)}`
})
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'Pilih User',
footer: `silahkan pilih user yang mau\ndi ajak ngobrol/chat anonymous`,
mentions: [sender],
sections: [{
title: '© Anonymous Chat', rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'start_conn':{
if (q.split('|')[0] == sender) return reply('Itu username kamu sendiri kak')
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var penerimanyo = q.split('|')[0]
var penerimanya = q.split('|')[1]
var nama_pengirim = q.split('|')[2]
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])

setRoom("±id", penerimanya, penerimanyo)
setRoom("±teman", penerimanyo, penerimanya)
setRoom("±id", penerimanyo, penerimanya)
setRoom("±teman", penerimanya, penerimanyo)

let roomC = `#${makeid(10)}`
var text_tersambung =`*Hallo ${cekUser("name", penerimanyo)} ${ucapanWaktu}*\n*Seseorang Mengajak Chating*\n\n*Dari:* ${nama_pengirim}\n\nSilahkan klik button ya kak jika ingin menghubungkan chat *ANONYMOUS*`
let btn_room = [
{ buttonId: ` ${prefix}auto_room ${penerimanyo}|${penerimanya}|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 },
{ buttonId: ` ${prefix}tolak_secret ${penerimanyo}`, buttonText: { displayText: '⋮☰ 𝗧𝗢𝗟𝗔𝗞' }, type: 1 }
]
var but_room = {
text: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [penerimanyo],
headerType: 1
}
conn.sendMessage(penerimanyo, but_room)
}
break
case 'dashboard':
case 'db':{
if (!isOwner) return reply(mess.OnlyOwner)
let teks =` 𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿\n\n Terdaftar : ${("id", db_user).length}\n`
for (let i of db_user){
teks +=` ID : @${i.id.split('@')[0]}\n Name : ${i.name}\n Premium : (${i.premium? '✓':'✘'})\n\n`
}
reply(teks)
}
break
case 'error':{
if (!isOwner) return reply(mess.OnlyOwner)
let ertxt = `*Server Error*\n*Tercatat:* ${db_error.length}\n\n`
for (let i of db_error){
ertxt +=`*Pengguna:* @${i.user.split('@')[0]}\n*Jam:* ${i.jam} WIB\n*Tanggal:* ${i.tanggal}\n*Type:* ${i.error}\n\n`
}
conn.sendMessage(from, {text:ertxt}, {quoted:msg})
}
break
case 'mysesi': case 'sendsesi': case 'session':{
if (!isOwner) return reply(mess.OnlyOwner)
reply('please wait..')
await sleep(3000)
var user_bot = await fs.readFileSync('./database/pengguna.json')
var sesi_bot = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: sesi_bot, mimetype: 'document/application', fileName: 'session.json'}, {quoted:msg})
conn.sendMessage(from, { document: user_bot, mimetype: 'document/application', fileName: 'pengguna.json'}, {quoted:msg})
}
break
case 'bc':
case 'broadcast':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} hallo`)
let db_orang = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let data_teks = `${q}`
for (let i of db_orang){ 
var button_broadcast = {text: data_teks, footer: '©atak bot broadcast', buttons: [{ buttonId: '!menu', buttonText: {displayText: 'MENU'}, type: 1}],headerType: 1}
conn.sendMessage(i.id, button_broadcast)
await sleep(2000)
}
reply(`*Sukses mengirim broadcast text ke ${db_orang.length} user*`)
}
break
case 'ping': case 'botstatus': case 'statusbot': {
let timestamp = speed()
let latensi = speed() - timestamp
const newww = performance.now()
const oldd = performance.now()
const respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - newww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
reply(respon)
}
break
case 'speedtest': {
if (!isOwner) return reply(mess.OnlyOwner)
m.reply('Testing Speed...')
let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let o
try {
o = await exec('python speed.py')
} catch (e) {
o = e
} finally {
let { stdout, stderr } = o
if (stdout.trim()) m.reply(stdout)
if (stderr.trim()) m.reply(stderr)
}
}
break

// GROUP MENU
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesan target|pesan bot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya kak')
if (!target) return reply(`Masukkan pesan target nya kak!`)
if (!bot) return reply(`Masukkan pesan bot nya kak!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
conn.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
} else {
reply('Tag atau reply orang yg mau dikick\n\n*Contoh:* #kick @tag')
}
break
case 'setppgrup': case 'setppgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./transaksi/${sender.split('@')[0]}.jpg`)
var media = `./transaksi/${sender.split('@')[0]}.jpg`
await conn.updateProfilePicture(from, { url: media })
await sleep(2000)
reply('Sukses mengganti foto profile group')
fs.unlinkSync(media)
break
case 'setnamegrup': case 'setnamegc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} teks`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc': case 'setdescription':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah ${command} teks`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tiktokauto':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAutoDownloadTT) return reply('tiktokAuto sudah aktif')
DB_Tiktok.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(DB_Tiktok, null, 2))
reply('Successfully Activate tiktokAuto In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAutoDownloadTT) return reply('tiktokAuto belum aktif')
DB_Tiktok.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(DB_Tiktok, null, 2))
reply('Successfully Disabling tiktokAuto In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'promote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'demote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'leave':{
if (!isOwner) return reply(mess.OnlyOwner)
await conn.groupLeave(m.chat).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
case 'add':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let users = m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break

// STORE MENU
case 'shop': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'click here',
footer: `*list from ${groupName}*`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'pilih disini',
footer: 'Silahkan pilih list yg mau dihapus',
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'update':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara #${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
updateResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil update List menu : *${args1}*`)
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'p': case 'proses':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`, [sender])
}
break
case 'd': case 'done':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`, [sender])
}
break
case 'welcome':{
reply(`WELCOME KAK JANGAN LUPA BACA DESKRIPSI GROUP YA KAK JANGAN RUSUH JUGA`) 
}
break
case 'bye':{
reply(`BYE KAK SEMOGA TENANG DI ALAM SANA`) 
}
break

// PREMIUM
case 'jadibot': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
jadibot(conn, msg, from)
}
break
case 'listjadibot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
try {
let user = [... new Set([...global.conns.filter(conn => conn.user).map(conn => conn.user)])]
te = "*List Jadibot*\n\n"
for (let i of user){
let y = await conn.decodeJid(i.id)
te += " × User : @" + y.split("@")[0] + "\n"
te += " × Name : " + i.name + "\n\n"
}
conn.sendMessage(from,{text:te,mentions: [y], },{quoted:msg})
} catch (err) {
reply(`Belum Ada User Yang Jadibot`)
}
break
case 'spamcall':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (!q) return reply(`Kirim perintah\n#${command} nomor\n\nContoh? #${command} 8xxxx\nNomor awal dari 8 bukan 62/08`)
var data = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${q}`).catch(() => reply(mess.error.api))
if (data.status == false) {
reply(data.msg)
} else {
reply(data.logs)
}
}
break
case 'addprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#addprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == true) return reply('User tersebut sudah premium')
setUser("±premium", number_one, true)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* aktif`)
}
break
case 'delprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#delprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == false) return reply('User tersebut tidak premium')
setUser("±premium", number_one, false)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* tidak`)
}
break
// CONVERT
case 'sticker': case 'stiker': case 's':
if (isImage || isQuotedImage){
mentions(`@${sender.split('@')[0]}\n𝐓𝐔𝐍𝐆𝐆𝐔 𝐒𝐄𝐁𝐄𝐍𝐓𝐀𝐑 𝐘𝐀 𝐊𝐀𝐊`, [sender])
console.log(`@${sender.split('@')[0]} Mengirim Gambar`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./database/${sender.split("@")[0]}.jpeg`)
var sticknya = fs.readFileSync(`./database/${sender.split("@")[0]}.jpeg`)
fs.writeFileSync('getpp.jpeg', sticknya)
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) {reply(error)})
.on('end', function () {conn.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
await sleep(5000)
fs.unlinkSync('./getpp.jpeg')
fs.unlinkSync('./getpp.webp')
fs.unlinkSync(`./database/${sender.split("@")[0]}.jpeg`)
} else {
reply(`Kirim/Reply foto dengan caption ${prefix+command}`)
}
break
case 'toimg':
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./database/${sender.split("@")[0]}.webp`)
let buffer = fs.readFileSync(`./database/${sender.split("@")[0]}.webp`)
let buffer2 = `./database/${sender.split("@")[0]}.webp`
var rand1 = 'database/'+getRandom('.webp')
var rand2 = 'database/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Auto Convert!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(`./database/${sender.split("@")[0]}.webp`)
})
} else {
reply(`Reply sticker dengan pesan ${prefix+command}`)
}
break
case 'npmstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} Username\nContoh: ${prefix+command} hikki-me`)
var pack = q
npmstalk(pack).then(i=>{
reply(`*STALKER-NPM*
name; ${i.name}
versionLatest; ${i.versionLatest}
versionUpdate; ${i.versionUpdate}
latestDependencies; ${i.latestDependencies}
publishDependencies; ${i.publishDependencies}
publishTime; ${i.publishTime}
latestPublishTime; ${i.latestPublishTime}`)
}).catch((err) => {
reply('Terjadi Kesalahan!!\nNama package npm tidak ditemukan')
})
}
break
case 'ffstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id\nContoh: ${prefix+command} 12345678`)
var pack = q
stalkff(pack).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid ff tidak ditemukan')
reply(`*STALKER FF*
ID: ${i.id}
Nickname: ${i.nickname}`)
})
}
break
case 'mlstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id|zone\nContoh: ${prefix+command} 1234578|1234`)
var id = q.split('|')[0]
var zon = q.split('|')[1]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
stalkml(id, zon).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid/zone tidak ditemukan')
reply(`*STALKER ML*
ID: ${id}
Zone: ${zon}
Nickname: ${i.nickname}`)
})
}
break
case 'githubstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} username\nContoh: ${prefix+command} Atak676`)
var user = q
fetchJson('https://api.github.com/users/'+user).then(i=>{
if (i.message) return reply('Terjadi Kesalahan!!\nUsername github tidak ditemukan')
reply(`*STALKER GITHUB*
login: ${i.login}
type: ${i.type}
name: ${i.name}
company: ${i.company}
blog: ${i.blog}
location: ${i.location}
bio: ${i.bio}
public_repos: ${i.public_repos}
public_gists: ${i.public_gists}
followers: ${i.followers}
following: ${i.following}
created_at: ${i.created_at}
updated_at: ${i.updated_at}`)
})
}
break

// CERPEN 
case 'cerpen-anak':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpe = await cerpen(`anak`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-bahasadaerah':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpet = await cerpen(`bahasa daerah`)
reply(`⭔ _*Title :*_ ${cerpet.title}\n⭔ _*Author :*_ ${cerpet.author}\n⭔ _*Category :*_ ${cerpet.kategori}\n⭔ _*Pass Moderation :*_ ${cerpet.lolos}\n⭔ _*Story :*_\n${cerpet.cerita}`)
}
break
case 'cerpen-bahasainggris':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpez = await cerpen(`bahasa Inggris`)
reply(`⭔ _*Title :*_ ${cerpez.title}\n⭔ _*Author :*_ ${cerpez.author}\n⭔ _*Category :*_ ${cerpez.kategori}\n⭔ _*Pass Moderation :*_ ${cerpez.lolos}\n⭔ _*Story :*_\n${cerpez.cerita}`)
}
break
case 'cerpen-bahasajawa':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpep = await cerpen(`bahasa jawa`)
reply(`⭔ _*Title :*_ ${cerpep.title}\n⭔ _*Author :*_ ${cerpep.author}\n⭔ _*Category :*_ ${cerpep.kategori}\n⭔ _*Pass Moderation :*_ ${cerpep.lolos}\n⭔ _*Story :*_\n${cerpep.cerita}`)
}
break
case 'cerpen-bahasasunda':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerped = await cerpen(`bahasa sunda`)
reply(`⭔ _*Title :*_ ${cerped.title}\n⭔ _*Author :*_ ${cerped.author}\n⭔ _*Category :*_ ${cerped.kategori}\n⭔ _*Pass Moderation :*_ ${cerped.lolos}\n⭔ _*Story :*_\n${cerped.cerita}`)
}
break
case 'cerpen-budaya':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerper = await cerpen(`budaya`)
reply(`⭔ _*Title :*_ ${cerper.title}\n⭔ _*Author :*_ ${cerper.author}\n⭔ _*Category :*_ ${cerper.kategori}\n⭔ _*Pass Moderation :*_ ${cerper.lolos}\n⭔ _*Story :*_\n${cerper.cerita}`)
}
break
case 'cerpen-cinta':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpem = await cerpen(`cinta`)
reply(`⭔ _*Title :*_ ${cerpem.title}\n⭔ _*Author :*_ ${cerpem.author}\n⭔ _*Category :*_ ${cerpem.kategori}\n⭔ _*Pass Moderation :*_ ${cerpem.lolos}\n⭔ _*Story :*_\n${cerpem.cerita}`)
}
break
case 'cerpen-cintaislami':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpel = await cerpen(`cinta islami`)
reply(`⭔ _*Title :*_ ${cerpel.title}\n⭔ _*Author :*_ ${cerpel.author}\n⭔ _*Category :*_ ${cerpel.kategori}\n⭔ _*Pass Moderation :*_ ${cerpel.lolos}\n⭔ _*Story :*_\n${cerpel.cerita}`)
}
break
case 'cerpen-cintapertama':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpes = await cerpen(`cinta pertama`)
reply(`⭔ _*Title :*_ ${cerpes.title}\n⭔ _*Author :*_ ${cerpes.author}\n⭔ _*Category :*_ ${cerpes.kategori}\n⭔ _*Pass Moderation :*_ ${cerpes.lolos}\n⭔ _*Story :*_\n${cerpes.cerita}`)
}
break
case 'cerpen-cintaromantis':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cerpde = await cerpen(`cinta romantis`)
reply(`⭔ _*Title :*_ ${cerpde.title}\n⭔ _*Author :*_ ${cerpde.author}\n⭔ _*Category :*_ ${cerpde.kategori}\n⭔ _*Pass Moderation :*_ ${cerpde.lolos}\n⭔ _*Story :*_\n${cerpde.cerita}`)
}
break
case 'cerpen-cintasedih':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let fejdj = await cerpen(`cinta sedih`)
reply(`⭔ _*Title :*_ ${fejdj.title}\n⭔ _*Author :*_ ${fejdj.author}\n⭔ _*Category :*_ ${fejdj.kategori}\n⭔ _*Pass Moderation :*_ ${fejdj.lolos}\n⭔ _*Story :*_\n${fejdj.cerita}`)
}
break
case 'cerpen-cintasegitiga':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let frofk = await cerpen(`Cinta segitiga`)
reply(`⭔ _*Title :*_ ${frofk.title}\n⭔ _*Author :*_ ${frofk.author}\n⭔ _*Category :*_ ${frofk.kategori}\n⭔ _*Pass Moderation :*_ ${frofk.lolos}\n⭔ _*Story :*_\n${frofk.cerita}`)
}
break
case 'cerpen-cintasejati':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let frljkek = await cerpen(`cinta sejati`)
reply(`⭔ _*Title :*_ ${frljkek.title}\n⭔ _*Author :*_ ${frljkek.author}\n⭔ _*Category :*_ ${frljkek.kategori}\n⭔ _*Pass Moderation :*_ ${frljkek.lolos}\n⭔ _*Story :*_\n${frljkek.cerita}`)
}
break
case 'cerpen-galau':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cdjfj = await cerpen(`galau`)
reply(`⭔ _*Title :*_ ${cdjfj.title}\n⭔ _*Author :*_ ${cdjfj.author}\n⭔ _*Category :*_ ${cdjfj.kategori}\n⭔ _*Pass Moderation :*_ ${cdjfj.lolos}\n⭔ _*Story :*_\n${cdjfj.cerita}`)
}
break
case 'cerpen-gokil':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let vrkfjf = await cerpen(`gokil`)
reply(`⭔ _*Title :*_ ${vrkfjf.title}\n⭔ _*Author :*_ ${vrkfjf.author}\n⭔ _*Category :*_ ${vrkfjf.kategori}\n⭔ _*Pass Moderation :*_ ${vrkfjf.lolos}\n⭔ _*Story :*_\n${vrkfjf.cerita}`)
}
break
case 'cerpen-inspiratif':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let ngkgk = await cerpen(`inspiratif`)
reply(`⭔ _*Title :*_ ${ngkgk.title}\n⭔ _*Author :*_ ${ngkgk.author}\n⭔ _*Category :*_ ${ngkgk.kategori}\n⭔ _*Pass Moderation :*_ ${ngkgk.lolos}\n⭔ _*Story :*_\n${ngkgk.cerita}`)
}
break
case 'cerpen-jepang':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let vrlgk = await cerpen(`jepang`)
reply(`⭔ _*Title :*_ ${vrlgk.title}\n⭔ _*Author :*_ ${vrlgk.author}\n⭔ _*Category :*_ ${vrlgk.kategori}\n⭔ _*Pass Moderation :*_ ${vrlgk.lolos}\n⭔ _*Story :*_\n${vrlgk.cerita}`)
}
break
case 'cerpen-kehidupan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let ntlgkt = await cerpen(`kehidupan`)
reply(`⭔ _*Title :*_ ${ntlgkt.title}\n⭔ _*Author :*_ ${ntlgkt.author}\n⭔ _*Category :*_ ${ntlgkt.kategori}\n⭔ _*Pass Moderation :*_ ${ntlgkt.lolos}\n⭔ _*Story :*_\n${ntlgkt.cerita}`)
}
break
case 'cerpen-keluarga':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let bmflg = await cerpen(`keluarga`)
reply(`⭔ _*Title :*_ ${bmflg.title}\n⭔ _*Author :*_ ${bmflg.author}\n⭔ _*Category :*_ ${bmflg.kategori}\n⭔ _*Pass Moderation :*_ ${bmflg.lolos}\n⭔ _*Story :*_\n${bmflg.cerita}`)
}
break
case 'cerpen-kisahnyata':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let yptoo = await cerpen(`kisah nyata`)
reply(`⭔ _*Title :*_ ${yptoo.title}\n⭔ _*Author :*_ ${yptoo.author}\n⭔ _*Category :*_ ${yptoo.kategori}\n⭔ _*Pass Moderation :*_ ${yptoo.lolos}\n⭔ _*Story :*_\n${yptoo.cerita}`)
}
break
case 'cerpen-korea':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let jptpgr = await cerpen(`korea`)
reply(`⭔ _*Title :*_ ${jptpgr.title}\n⭔ _*Author :*_ ${jptpgr.author}\n⭔ _*Category :*_ ${jptpgr.kategori}\n⭔ _*Pass Moderation :*_ ${jptpgr.lolos}\n⭔ _*Story :*_\n${jptpgr.cerita}`)
}
break
case 'cerpen-kristen':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let yesusanjing = await cerpen(`kristen`)
reply(`⭔ _*Title :*_ ${yesusanjing.title}\n⭔ _*Author :*_ ${yesusanjing.author}\n⭔ _*Category :*_ ${yesusanjing.kategori}\n⭔ _*Pass Moderation :*_ ${yesusanjing.lolos}\n⭔ _*Story :*_\n${yesusanjing.cerita}`)
}
break
case 'cerpen-liburan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let frkfkrk = await cerpen(`liburan`)
reply(`⭔ _*Title :*_ ${frkfkrk.title}\n⭔ _*Author :*_ ${frkfkrk.author}\n⭔ _*Category :*_ ${frkfkrk.kategori}\n⭔ _*Pass Moderation :*_ ${frkfkrk.lolos}\n⭔ _*Story :*_\n${frkfkrk.cerita}`)
}
break
case 'cerpen-malaysia':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let mzbdjd = await cerpen(`malaysia`)
reply(`⭔ _*Title :*_ ${mzbdjd.title}\n⭔ _*Author :*_ ${mzbdjd.author}\n⭔ _*Category :*_ ${mzbdjd.kategori}\n⭔ _*Pass Moderation :*_ ${mzbdjd.lolos}\n⭔ _*Story :*_\n${mzbdjd.cerita}`)
}
break
case 'cerpen-mengharukan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let bgfngk = await cerpen(`mengharukan`)
reply(`⭔ _*Title :*_ ${bgfngk.title}\n⭔ _*Author :*_ ${bgfngk.author}\n⭔ _*Category :*_ ${bgfngk.kategori}\n⭔ _*Pass Moderation :*_ ${bgfngk.lolos}\n⭔ _*Story :*_\n${bgfngk.cerita}`)
}
break
case 'cerpen-misteri':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let lapdoek = await cerpen(`misteri`)
reply(`⭔ _*Title :*_ ${lapdoek.title}\n⭔ _*Author :*_ ${lapdoek.author}\n⭔ _*Category :*_ ${lapdoek.kategori}\n⭔ _*Pass Moderation :*_ ${lapdoek.lolos}\n⭔ _*Story :*_\n${lapdoek.cerita}`)
}
break
case 'cerpen-motivasi':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let bltkyj = await cerpen(`motivasi`)
reply(`⭔ _*Title :*_ ${bltkyj.title}\n⭔ _*Author :*_ ${bltkyj.author}\n⭔ _*Category :*_ ${bltkyj.kategori}\n⭔ _*Pass Moderation :*_ ${bltkyj.lolos}\n⭔ _*Story :*_\n${bltkyj.cerita}`)
}
break
case 'cerpen-nasihat':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let qpeidek = await cerpen(`nasihat`)
reply(`⭔ _*Title :*_ ${qpeidek.title}\n⭔ _*Author :*_ ${qpeidek.author}\n⭔ _*Category :*_ ${qpeidek.kategori}\n⭔ _*Pass Moderation :*_ ${qpeidek.lolos}\n⭔ _*Story :*_\n${qpeidek.cerita}`)
}
break
case 'cerpen-nasionalisme':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let cdmrgo = await cerpen(`nasionalisme`)
reply(`⭔ _*Title :*_ ${cdmrgo.title}\n⭔ _*Author :*_ ${cdmrgo.author}\n⭔ _*Category :*_ ${cdmrgo.kategori}\n⭔ _*Pass Moderation :*_ ${cdmrgo.lolos}\n⭔ _*Story :*_\n${cdmrgo.cerita}`)
}
break
case 'cerpen-olahraga':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let qpdiek = await cerpen(`olahraga`)
reply(`⭔ _*Title :*_ ${qpdiek.title}\n⭔ _*Author :*_ ${qpdiek.author}\n⭔ _*Category :*_ ${qpdiek.kategori}\n⭔ _*Pass Moderation :*_ ${qpdiek.lolos}\n⭔ _*Story :*_\n${qpdiek.cerita}`)
}
break
case 'cerpen-patahhati':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let vrlfor = await cerpen(`patah hati`)
reply(`⭔ _*Title :*_ ${vrlfor.title}\n⭔ _*Author :*_ ${vrlfor.author}\n⭔ _*Category :*_ ${vrlfor.kategori}\n⭔ _*Pass Moderation :*_ ${vrlfor.lolos}\n⭔ _*Story :*_\n${vrlfor.cerita}`)
}
break
case 'cerpen-penantian':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let aldpek = await cerpen(`penantian`)
reply(`⭔ _*Title :*_ ${aldpek.title}\n⭔ _*Author :*_ ${aldpek.author}\n⭔ _*Category :*_ ${aldpek.kategori}\n⭔ _*Pass Moderation :*_ ${aldpek.lolos}\n⭔ _*Story :*_\n${aldpek.cerita}`)
}
break
case 'cerpen-pendidikan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let xnrjrk = await cerpen(`pendidikan`)
reply(`⭔ _*Title :*_ ${xnrjrk.title}\n⭔ _*Author :*_ ${xnrjrk.author}\n⭔ _*Category :*_ ${xnrjrk.kategori}\n⭔ _*Pass Moderation :*_ ${xnrjrk.lolos}\n⭔ _*Story :*_\n${xnrjrk.cerita}`)
}
break
case 'cerpen-pengalaman':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let hrkgor = await cerpen(`pengalaman pribadi`)
reply(`⭔ _*Title :*_ ${hrkgor.title}\n⭔ _*Author :*_ ${hrkgor.author}\n⭔ _*Category :*_ ${hrkgor.kategori}\n⭔ _*Pass Moderation :*_ ${hrkgor.lolos}\n⭔ _*Story :*_\n${hrkgor.cerita}`)
}
break
case 'cerpen-pengorbanan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let itklog = await cerpen(`pengorbanan`)
reply(`⭔ _*Title :*_ ${itklog.title}\n⭔ _*Author :*_ ${itklog.author}\n⭔ _*Category :*_ ${itklog.kategori}\n⭔ _*Pass Moderation :*_ ${itklog.lolos}\n⭔ _*Story :*_\n${itklog.cerita}`)
}
break
case 'cerpen-penyesalan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let pgrjgo = await cerpen(`penyesalan`)
reply(`⭔ _*Title :*_ ${pgrjgo.title}\n⭔ _*Author :*_ ${pgrjgo.author}\n⭔ _*Category :*_ ${pgrjgo.kategori}\n⭔ _*Pass Moderation :*_ ${pgrjgo.lolos}\n⭔ _*Story :*_\n${pgrjgo.cerita}`)
}
break
case 'cerpen-perjuangan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let vtlgotk = await cerpen(`perjuangan`)
reply(`⭔ _*Title :*_ ${vtlgotk.title}\n⭔ _*Author :*_ ${vtlgotk.author}\n⭔ _*Category :*_ ${vtlgotk.kategori}\n⭔ _*Pass Moderation :*_ ${vtlgotk.lolos}\n⭔ _*Story :*_\n${vtlgotk.cerita}`)
}
break
case 'cerpen-perpisahan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let wpfuej = await cerpen(`perpisahan`)
reply(`⭔ _*Title :*_ ${wpfuej.title}\n⭔ _*Author :*_ ${wpfuej.author}\n⭔ _*Category :*_ ${wpfuej.kategori}\n⭔ _*Pass Moderation :*_ ${wpfuej.lolos}\n⭔ _*Story :*_\n${wpfuej.cerita}`)
}
break
case 'cerpen-persahabatan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let jptoyk = await cerpen(`persahabatan`)
reply(`⭔ _*Title :*_ ${jptoyk.title}\n⭔ _*Author :*_ ${jptoyk.author}\n⭔ _*Category :*_ ${jptoyk.kategori}\n⭔ _*Pass Moderation :*_ ${jptoyk.lolos}\n⭔ _*Story :*_\n${jptoyk.cerita}`)
}
break
case 'cerpen-petualangan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let qwers = await cerpen(`petualangan`)
reply(`⭔ _*Title :*_ ${qwers.title}\n⭔ _*Author :*_ ${qwers.author}\n⭔ _*Category :*_ ${qwers.kategori}\n⭔ _*Pass Moderation :*_ ${qwers.lolos}\n⭔ _*Story :*_\n${qwers.cerita}`)
}
break
case 'cerpen-ramadhan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let vrmfkk = await cerpen(`ramadhan`)
reply(`⭔ _*Title :*_ ${vrmfkk.title}\n⭔ _*Author :*_ ${vrmfkk.author}\n⭔ _*Category :*_ ${vrmfkk.kategori}\n⭔ _*Pass Moderation :*_ ${vrmfkk.lolos}\n⭔ _*Story :*_\n${vrmfkk.cerita}`)
}
break
case 'cerpen-remaja':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let vhptotk = await cerpen(`remaja`)
reply(`⭔ _*Title :*_ ${vhptotk.title}\n⭔ _*Author :*_ ${vhptotk.author}\n⭔ _*Category :*_ ${vhptotk.kategori}\n⭔ _*Pass Moderation :*_ ${vhptotk.lolos}\n⭔ _*Story :*_\n${vhptotk.cerita}`)
}
break
case 'cerpen-rindu':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let hptotlltk = await cerpen(`rindu`)
reply(`⭔ _*Title :*_ ${hptotlltk.title}\n⭔ _*Author :*_ ${hptotlltk.author}\n⭔ _*Category :*_ ${hptotlltk.kategori}\n⭔ _*Pass Moderation :*_ ${hptotlltk.lolos}\n⭔ _*Story :*_\n${hptotlltk.cerita}`)
}
break
case 'cerpen-rohani':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let zaldjdws = await cerpen(`rohani`)
reply(`⭔ _*Title :*_ ${zaldjdws.title}\n⭔ _*Author :*_ ${zaldjdws.author}\n⭔ _*Category :*_ ${zaldjdws.kategori}\n⭔ _*Pass Moderation :*_ ${zaldjdws.lolos}\n⭔ _*Story :*_\n${zaldjdws.cerita}`)
}
break
case 'cerpen-romantis':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let lxprhrh = await cerpen(`romantis`)
reply(`⭔ _*Title :*_ ${lxprhrh.title}\n⭔ _*Author :*_ ${lxprhrh.author}\n⭔ _*Category :*_ ${lxprhrh.kategori}\n⭔ _*Pass Moderation :*_ ${lxprhrh.lolos}\n⭔ _*Story :*_\n${lxprhrh.cerita}`)
}
break
case 'cerpen-sastra':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let qpifker = await cerpen(`sastra`)
reply(`⭔ _*Title :*_ ${qpifker.title}\n⭔ _*Author :*_ ${qpifker.author}\n⭔ _*Category :*_ ${qpifker.kategori}\n⭔ _*Pass Moderation :*_ ${qpifker.lolos}\n⭔ _*Story :*_\n${qpifker.cerita}`)
}
break
case 'cerpen-sedih':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let bmflgkjt = await cerpen(`sedih`)
reply(`⭔ _*Title :*_ ${bmflgkjt.title}\n⭔ _*Author :*_ ${bmflgkjt.author}\n⭔ _*Category :*_ ${bmflgkjt.kategori}\n⭔ _*Pass Moderation :*_ ${bmflgkjt.lolos}\n⭔ _*Story :*_\n${bmflgkjt.cerita}`)
}
break
case 'cerpen-sejarah':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let xwpwifj = await cerpen(`sejarah`)
reply(`⭔ _*Title :*_ ${xwpwifj.title}\n⭔ _*Author :*_ ${xwpwifj.author}\n⭔ _*Category :*_ ${xwpwifj.kategori}\n⭔ _*Pass Moderation :*_ ${xwpwifj.lolos}\n⭔ _*Story :*_\n${xwpwifj.cerita}`)
}
break

// Fun Menu
case 'memek':
case 'bego':
case 'goblok':
case 'janda':
case 'perawan':
case 'babi':
case 'tolol':
case 'pinter':
case 'pintar':
case 'asu':
case 'bodoh':
case 'gay':
case 'lesby':
case 'bajingan':
case 'jancok':
case 'anjing':
case 'ngentod':
case 'ngentot':
case 'monyet':
case 'mastah':
case 'newbie':
case 'bangsat':
case 'bangke':
case 'sange':
case 'sangean':
case 'dakjal':
case 'horny':
case 'wibu':
case 'puki':
case 'peak':
case 'pantex':
case 'pantek':
case 'setan':
case 'iblis':
case 'cacat':
case 'yatim':
case 'piatu':
{
if (!isGroup) return reply(mess.OnlyGrup)
let member = participants.map((u) => u.id)
let org = member[Math.floor(Math.random() * member.length)]
conn.sendMessage(from, { text: `anak ${command} di sini adalah @${org.split('@')[0]}`, mentions: [org] }, { quoted: msg })
}
break

// SOUND MENU
case 'sound1':case 'sound2':
case 'sound3':case 'sound4':case 'sound5':case 'sound6':
case 'sound7':case 'sound8':case 'sound9':case 'sound10':
case 'sound11':case 'sound12':case 'sound13':case 'sound14':
case 'sound15':case 'sound16':case 'sound17':case 'sound18':
case 'sound19':case 'sound20':case 'sound21':case 'sound22':
case 'sound23':case 'sound24':case 'sound25':case 'sound26':
case 'sound27':case 'sound28':case 'sound29':case 'sound30':
case 'sound31':case 'sound32':case 'sound33':case 'sound34':
case 'sound35':case 'sound36':case 'sound37':case 'sound38':
case 'sound39':case 'sound40':case 'sound41':case 'sound42':
case 'sound43':case 'sound44':case 'sound45':case 'sound46':
case 'sound47':case 'sound48':case 'sound49':case 'sound50':
case 'sound51':case 'sound52':case 'sound53':case 'sound54':
case 'sound55':case 'sound56':case 'sound57':case 'sound58':
case 'sound59':case 'sound60':case 'sound61':case 'sound62':
case 'sound63':case 'sound64':case 'sound65':case 'sound66':
case 'sound67':case 'sound68':case 'sound69':case 'sound70':
case 'sound71':case 'sound72':case 'sound73':case 'sound74':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
var inicdd = await getBuffer(`https://github.com/saipulanuar/Api-Github/raw/main/sound/${command}.mp3`)
conn.sendMessage(from, {audio:inicdd, mimetype:'audio/mpeg', ptt:true}, {quoted:msg})
break

// DOWNLOAD MENU
case 'tiktok':{
if (!q) return reply('contoh :\n#tiktok https://vt.tiktok.com/ZSRG695C8/')
reply(mess.wait)
fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=${q}&apikey=dyJhXvqe`)
.then(tt_res => {
reply(`𝙏𝙄𝙆𝙏𝙊𝙆 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿

𝘼𝙪𝙩𝙝𝙤𝙧: Ridho
𝙅𝙪𝙙𝙪𝙡: ${tt_res.result.judul}
𝙎𝙤𝙪𝙧𝙘𝙚: ${q}

Video sedang dikirim...`)
conn.sendMessage(from,{video:{url:tt_res.result.video.link2}, caption:'No Watermark!'}, {quotes:msg})
}).catch((err) => {
reply('Terjadi Kesalahan!!\nUrl tidak valid')
})
}
break
case 'ytmp4': case 'mp4':{
if (!text) return reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp4(text)
}
break
case 'ytmp3': case 'mp3':{
if (!text) return reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp3(text)
}
break

// WALLPAPER MENU
case 'ppcouple': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
let random = anu[Math.floor(Math.random() * anu.length)]
conn.sendMessage(from, { image: { url: random.male }, caption: `Foto Couple Male` }, { quoted: msg })
conn.sendMessage(from, { image: { url: random.female }, caption: `Fofo Couple Female` }, { quoted: msg })
}
break
default:


}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
conn.sendMessage(setting.ownerNumber, {text:errny, mentions:[sender]})
}}