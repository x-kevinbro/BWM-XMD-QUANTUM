const config = require('../config')
const axios = require('axios');
const fs = require('fs')
const apkdl = require('../lib/apkdl'); 
const cheerio = require('cheerio'); 
const { phsearch, phdl } = require('darksadas-yt-pornhub-scrape')
const { File } = require('megajs');
const { igdl } = require('ruhend-scraper')
const { sizeFormatter} = require('human-readable');;
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    getsize,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')
const {
    cmd,
    commands
} = require('../command')
const { getFbVideoInfo } =  require("fb-downloader-scrapper")

var sizetoo =  "_This file size is too big_"
const yts = require("ytsearch-venom")
const g_i_s = require('g-i-s'); 
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const sharp = require('sharp');
async function resizeImage(inputBuffer, width, height) {
    try {
        return await sharp(inputBuffer).resize(width, height).toBuffer();
    } catch (error) {
        console.error('Error resizing image:', error);
        return inputBuffer; // Return original if resizing fails
    }
}


let wm = config.FOOTER
let newsize = config.MAX_SIZE * 1024 * 1024



async function ytmp3(url) {
  try {
    const sadas = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=mp3&url=${url}`);
 
    const $ = cheerio.load(sadas.data);



    const sadas1 = await axios.get(`https://p.oceansaver.in/api/progress?id=${sadas.data.id}`);

    const $1 = cheerio.load(sadas1.data);

return sadas1.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}




async function GDriveDl(url) {
    let id, res = { "error": true }
    if (!(url && url.match(/drive\.google/i))) return res

    const formatSize = sizeFormatter({
        std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
    })

    try {
        id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
        if (!id) throw 'ID Not Found'
        res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
            method: 'post',
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                'content-length': 0,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'origin': 'https://drive.google.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
                'x-drive-first-party': 'DriveWebUi',
                'x-json-requested': 'true'
            }
        })
        let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))
        if (!downloadUrl) throw 'Link Download Limit!'
        let data = await fetch(downloadUrl)
        if (data.status !== 200) return data.statusText
        return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
    } catch (e) {
        console.log(e)
        return res
    }
}





cmd({
    pattern: "alex",
    alias: ["ytsong"],
    use: '.song lelena',
    react: "🎧",
      desc: "Download songs",
    dontAddCommandList: true,
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, isAlex, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   

	    if (!isAlex && !isMe) return reply("❌ This command only working MR ALEX ID!");
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    let wm = config.FOOTER
    var result = results.videos[0]
     let caption = `*╭─「 \`Alex Music Video\` 」*
*╰────────────┈*>
*⏤͟͟͞͞★❬❬ Alex Music Information ❭❭⏤͟͟͞͞★*
*╭⃘⃝─────────────┈◦•☻•◦*
*╎🍀 \`Title:\` ${result.title}*
*╎👁️‍🗨️ \`Views:\` ${result.views}*
*╎🔮 \`Duration:\` ${result.duration}*
*╚─────────────❨⥁⚘*

\`🌟 𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝘀 - https://whatsapp.com/channel/0029Vaa6QzC4o7qEV92gin3H\`

> *Alex Music Video 🤍🕊️|🇱🇰❞*`
const buttons = [
	{buttonId: prefix + 'alexaa ' + result.url, buttonText: {displayText: 'Send info 🎶'}, type: 1},
  {buttonId: prefix + 'alexa ' + result.url, buttonText: {displayText: 'Audio Type 🎶'}, type: 1}
  
]
const buttonMessage = {
    image: {url: result.thumbnail},
    caption: caption,
    footer: wm,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply(N_FOUND)
  console.log(e)
}
})



cmd({
    pattern: "alexaa",
    react: "🔮",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
        if (!q) return await reply('*Need a youtube url!*');

          try {
 if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    let wm = config.FOOTER
    var result = results.videos[0]
     let caption = `*╭─「 \`Alex Music Video\` 」*
*╰────────────┈*>
*⏤͟͟͞͞★❬❬ Alex Music Information ❭❭⏤͟͟͞͞★*
*╭⃘⃝─────────────┈◦•☻•◦*
*╎🍀 \`Title:\` ${result.title}*
*╎👁️‍🗨️ \`Views:\` ${result.views}*
*╎🔮 \`Duration:\` ${result.duration}*
*╚─────────────❨⥁⚘*

\`🌟 𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝘀 - https://whatsapp.com/channel/0029Vaa6QzC4o7qEV92gin3H\`

> *Alex Music Video 🤍🕊️|🇱🇰❞*`

await conn.sendMessage(
  `120363299490408244@newsletter`, 
  { 
    image: { url: result.thumbnail }, 
    caption: caption
  }
);
		  
                await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
           } catch (e) {
  reply(N_FOUND)
  console.log(e)
}
})



cmd({
    pattern: "alexa",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
        if (!q) return await reply('*Need a youtube url!*');

          try {

		  const prog = await fetchJson(`https://yt-five-tau.vercel.app/download?q=${q}&format=mp3`)

await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
		    
		        
                await conn.sendMessage(`120363299490408244@newsletter`, { 
  audio: { url: prog.result.download }, 
  mimetype: 'audio/mpeg', 
  ptt: true 
}, { quoted: mek });

                await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
           } catch (e) {
  reply(N_FOUND)
  console.log(e)
}
})


cmd({
    pattern: "sadas",
    alias: ["ytsong"],
    use: '.song lelena',
    react: "🎧",
      desc: "Download songs",
    dontAddCommandList: true,
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, isAlex, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   

	    if (!isAlex && !isMe) return reply("❌ This command only working MR ALEX ID!");
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    let wm = config.FOOTER
    var result = results.videos[0]
     let caption = `*┌「 Memory warehouse 」*
*┕┄┄┄○┄┄○┄┄○┄┄○┄┄○┄┄◊◈►*
*┏┄┄○┄┄○┄┄○┄┄○┄┄○┄┄○┄┄○┄┄○┄┄◊◈►*
*┋*
*┣  ☘️ Title    : ${result.title}*
*┣  👻 Views    : ${result.views}*
*┣  ⏰ Duration : ${result.duration}*
*┋*
*┖┄┄○┄┄○┄┄○┄┄○┄┄○┄┄○┄┄○┄┄○┄┄◊◈►*

*\`🌀 Follow us:\`* _https://whatsapp.com/channel/0029VasBgBq3bbV8hFgKZq3D_

> *Memory warehouse 🖤🌼🇱🇰 ❜❜*`
const buttons = [
	{buttonId: prefix + 'sadasaa ' + result.url, buttonText: {displayText: 'Send info 🎶'}, type: 1},
  {buttonId: prefix + 'sadasa ' + result.url, buttonText: {displayText: 'Audio Type 🎶'}, type: 1}
  
]
const buttonMessage = {
    image: {url: result.thumbnail},
    caption: caption,
    footer: wm,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply(N_FOUND)
  console.log(e)
}
})
