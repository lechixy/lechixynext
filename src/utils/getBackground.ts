export let backgrounds = [
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069300097851452/1.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069300529868800/2.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069300982861834/3.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069301305819176/4.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026069301611991091/5.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071806932684810/20.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071807272439888/19.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071807733800970/18.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071808019017768/17.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071494314430504/16.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071494645796934/15.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071495115550750/14.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071495702749184/13.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071496143163432/12.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071496596140032/11.webp",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071496961036309/10.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071497279819797/9.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1026071497611161600/8.jpg",
]

export function getRandomBackground(){
    let random = Math.floor(Math.random() * backgrounds.length)
    return backgrounds[random]
}