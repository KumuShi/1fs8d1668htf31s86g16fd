const Discord = require("discord.js")
const client = new Discord.Client()

client.login(process.env.TOKEN)

var prefix = ("!")

client.on("message", (message) => {

    if(message.content == "cc"){
        message.channel.send("han")
    }
})
