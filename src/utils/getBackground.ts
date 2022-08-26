export let backgrounds = [
    "https://cdn.discordapp.com/attachments/999248792840831036/1011686057865117827/unknown.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1011685470071173252/unknown.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1011685892643094678/unknown.png",
    "https://cdn.discordapp.com/attachments/999248792840831036/1011685893104472155/unknown.jpg",
    "https://cdn.discordapp.com/attachments/999248792840831036/1011692892999389255/unknown.jpg"
]

export function getRandomBackground(){
    let random = Math.floor(Math.random() * backgrounds.length)
    return backgrounds[random]
}