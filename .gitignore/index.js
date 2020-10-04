// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

const fs = require('fs');
const { error } = require("console");

Liste_IMG = {
  "rem" : 4,
  "nsfw" : {
    "rem" : 3,
  }
}

Liste_GIF = {
  "hug" : 17
}

nmbrwaifu = 30

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`master's commands 🌸`, { type: 'WATCHING' });
});

client.on("guildMemberAdd", (user)=>{
  servers = fs.readFileSync("serverconfigs.json")
  servers = JSON.parse(servers)
  msg = {
    color: 0x0099ff,
    title: 'Welcome ' + user.displayName + " !",
    description: "Hi ! I'm Rem !\nWelcome to our server !\nIn this server, you can do soooome things, like talk, found new friends, have fun...isn't it fantastic ?\nAnd...if you want to play with me...we have special channels ~\nIf you need anything, just ask to staff members ! :3",
    /*thumbnail: {
      url: "member pfp",
    },*/
    image: {
      url: "https://databaserandimg.000webhostapp.com/IMAGES/rem/4.png",
    },
    timestamp: new Date()
  };
  user.send({ embed : msg })
  if(message.guild.id in servers){
    if(servers[message.guild.id]["wchannel"] != 0){
      channel = message.guild.channels.cache.get(servers[message.guild.id]["wchannel"])
      msg = {
        color: 0x0099ff,
        title: "New member",
        description: user.displayName + " joined the server !",
        /*thumbnail: {
          url: "member pfp",
        },*/
        timestamp: new Date(),
      };
      channel.send({ embed : msg })
    }
  }
})

client.on("message", async message => {

  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Let's go with a few common example commands! Feel free to delete or change those.

  servers = fs.readFileSync("serverconfigs.json")
  servers = JSON.parse(servers)

  if(message.channel.type != "dm"){
    if(message.guild.id in servers){
      if(message.content.includes("http") || message.content.includes("www") && servers[message.guild.id]["antilink"] == "on"){
        message.channel.send("You can't use a link while the antilink is on !")
        message.delete().catch(error);
        if(servers[message.guild.id]["logs"] != "0"){
          channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
          msg = {
            color: 0x0099ff,
            title: "Antikink",
            description: message.author.username + ' typed a link !\nThe message was :\n' + message.content,
            /*thumbnail: {
              url: "member pfp",
            },*/
            timestamp: new Date(),
          };
          channel.send({ embed : msg })
        }
      }
    }
    else{
      servers[message.guild.id] = {"wchannel" : "0", "logs" : "0", "reactionrole" : {}, "antilink" : "off"}
    }
  }

  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command in Liste_IMG){
    continuite = 1
    lastarg = args[args.length - 1]
    if(lastarg == "--nsfw"){
      if(message.channel.nsfw == true){
        if(args[0] == undefined || args[0] == "--nsfw"){
          rnmbr = Math.random()*Liste_IMG["nsfw"][command]
          while(rnmbr == 0){
            rnmbr = Math.random()*Liste_IMG["nsfw"][command]
          }
          rnmbr = Math.ceil(rnmbr)
        }
        else{
          if(0 < args[0] && args[0] <= Liste_IMG["nsfw"][command]){
            rnmbr = args[0]
          }
          else{
            message.channel.send("I don't have this number, sorry.")
            continuite = 0
          }
        }
        if(continuite == 1){
          lien = "https://databaserandimg.000webhostapp.com/IMAGES/NSFW/" + command + "/" + rnmbr + ".png"
          msg = {
            color: 0x0099ff,
            title: 'Here\'s your image !',
            description: '[If you can\'t see the image, click here.](' + lien + ')',
            /*thumbnail: {
              url: "member pfp",
            },*/
            image: {
              url: lien,
            },
            timestamp: new Date(),
            footer: {
              text: 'Image ' + rnmbr + "/" + Liste_IMG["nsfw"][command],
            }
          };
          message.channel.send({ embed : msg })
        }
      }
      else{
        message.channel.send("You're not in a NSFW channel !")
      }
    }
    else{
      if(args[0] == undefined){
        rnmbr = Math.random()*Liste_IMG[command]
        while(rnmbr == 0){
          rnmbr = Math.random()*Liste_IMG[command]
        }
        rnmbr = Math.ceil(rnmbr)
      }
      else{
        if(0 < args[0] && args[0] <= Liste_IMG[command]){
          rnmbr = args[0]
        }
        else{
          message.channel.send("I don't have this number, sorry.")
          continuite = 0
        }
      }
      if(continuite == 1){
        lien = "https://databaserandimg.000webhostapp.com/IMAGES/" + (command) + "/" + rnmbr + ".png"
        msg = {
          color: 0x0099ff,
          title: 'Here\'s your image !',
          description: '[If you can\'t see the image, click here.](' + lien + ')',
          /*thumbnail: {
            url: "member pfp",
          },*/
          image: {
            url: lien,
          },
          timestamp: new Date(),
          footer: {
            text: 'Image ' + rnmbr + "/" + Liste_IMG[command],
          }
        };
        message.channel.send({ embed : msg })
      }
    }
  }

  if(command === "hug"){
    rnmbr = Math.random()*Liste_GIF[command]
    while(rnmbr == 0){
      rnmbr = Math.random()*Liste_GIF[command]
    }
    rnmbr = Math.ceil(rnmbr)
    if(args[0] != undefined && message.guild.member(args[0].substring(3,args[0].length-1))){
      ttext = message.author.username + " hugs " + message.mentions.users.first().username + " !"
    }
    else{
      ttext = message.author.username + " hugs me ! owo"
    }
    lien = "/GIF/hug/" + rnmbr + ".gif"
    file = new Discord.MessageAttachment('.' + lien);
    lien = "attachment://" + rnmbr + ".gif"
    msg = {
      color: 0x0099ff,
      title: ttext,
      /*thumbnail: {
        url: "member pfp",
      },*/
      image: {
        url: lien,
      },
      timestamp: new Date(),
      footer: {
        text: 'Image ' + rnmbr + "/" + Liste_GIF[command],
      }
    };
    message.channel.send({ files: [file], embed : msg })
  }

  /*if(command == "play"){
    players = fs.readFileSync("players.json")
    players = JSON.parse(players)
    if(message.author.id in players){
      message.channel.send("You're already a player !")
    }
    else{
      players[message.author.id] = {"waifus":{}, "money":0, "waifudex":{}, "actual": 1}
      message.channel.send("Welcome to my game, master !")
    }
    players = JSON.stringify(players)
    fs.writeFileSync("players.json", players, (err)=>{
      if(err) throw err;
    })
  }

  if(command == "gacha"){
    players = fs.readFileSync("players.json")
    players = JSON.parse(players)
    if(message.author.id in players){
      if(players[message.author.id]["money"]>= 50){
        rnmbr = Math.ceil(Math.random()*nmbrwaifu)
        while(rnmbr == 0){
          rnmbr = Math.ceil(Math.random()*nmbrwaifu)
        }
        players[message.author.id]["money"] += -50
        nwaifu = Object.keys(players[message.author.id]["waifus"]).length + 1
        players[message.author.id]["waifus"][nwaifu] = [rnmbr, 1, 0, "nothing", "nothing", "nothing", "nothing", "nothing", "nothing", "nothing"] // id, lv, exp, tete, corp, bas, chassures, arme, bouclier, familier
        message.channel.send("Congrats ! You got the waifu number " + rnmbr + " !")
        if(rnmbr in players[message.author.id]["waifudex"]){
          players[message.author.id]["waifudex"][rnmbr] += 1
        }
        else{
          players[message.author.id]["waifudex"][rnmbr] = 1
        }
      }
    }
    players = JSON.stringify(players)
    fs.writeFileSync("players.json", players, (err)=>{
      if(err) throw err;
    })
  }*/

  /*if(message.channel.type == "dm"){
    continuation = 1
    if(command == "issue"){
      tickets = fs.readFileSync("tickets.json")
      tickets = JSON.parse(tickets)
      for(i in tickets){
        console.log(tickets[i][0])
        if(tickets[i][0] == message.author.id){
          continuation = 0
          place = i
        }
      }
      if(continuation == 0){
        message.channel.send("You already have a ticket !\nHis current place is " + i + "/" + parseInt(Object.keys(tickets).length) + " !")
      }
      else{
        msg = message.content.substring(7, message.content.length)
        tickets[Object.keys(tickets).length+1] = [message.author.id, msg]
        msg = {
          color: 0x0099ff,
          title: 'Here\'s your ticket !',
          description: tickets[Object.keys(tickets).length][1],
          image: {
            url: "https://databaserandimg.000webhostapp.com/IMAGES/rem/1.png",
          },
          timestamp: new Date(),
          footer: {
            text: 'Ticket ' + parseInt(Object.keys(tickets).length) + "/" + parseInt(Object.keys(tickets).length),
          }
        };
        message.channel.send({ embed : msg })
      }
      tickets = JSON.stringify(tickets)
      fs.writeFileSync("tickets.json", tickets, (err)=>{
        if(err) throw err;
      })
    }
  }*/

  /*if(command === "issues" && message.member.hasPermission("ADMINISTRATOR")){
    tickets = fs.readFileSync("tickets.json")
    tickets = JSON.parse(tickets)
    if('1' in tickets){
      msg = {
        color: 0x0099ff,
        title: 'Here\'s your ticket !',
        description: tickets["1"][1],
        image: {
          url: "https://databaserandimg.000webhostapp.com/IMAGES/rem/1.png",
        },
        timestamp: new Date(),
        footer: {
          text: 'Ticket 1' + "/" + parseInt(Object.keys(tickets).length),
        }
      };
      message.channel.send({ embed : msg })
    }
    else{
      message.channel.send("No more tickets !")
    }
    tickets = JSON.stringify(tickets)
    fs.writeFileSync("tickets.json", tickets, (err)=>{
      if(err) throw err;
    })
  }*/

  /*if(command === "ans" && message.member.hasPermission("ADMINISTRATOR")){
    if(servers[message.guild.id]["issues"] != "0"){
      if(servers[message.guild.id]["issues"] == message.channel.id){
        tickets = fs.readFileSync("tickets.json")
        tickets = JSON.parse(tickets)
        if('1' in tickets){
          msg = message.content.substring(5, message.content.length)
          myembed = {
            color: 0x0099ff,
            title: 'Here\'s your response !',
            description: "Asking : " + tickets["1"][1] + "\nResponse by " + message.author.username + " : " + msg,
            timestamp: new Date(),
            footer: {
              text: 'Ticket 1' + "/" + parseInt(Object.keys(tickets).length),
            }
          };
          client.users.cache.get(tickets["1"][0]).send({ embed : myembed })
          delete tickets["1"];
          if(servers[message.guild.id]["issues"] != "0"){
            channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
            msg = {
              color: 0x0099ff,
              title: "Issues",
              description: message.author.username + ' answered to an issue !',
              timestamp: new Date(),
            };
            channel.send({ embed : msg })
          }
        }
        else{
          message.channel.send("You answered to nothing !")
        }
        tickets = JSON.stringify(tickets)
        fs.writeFileSync("tickets.json", tickets, (err)=>{
          if(err) throw err;
        })
      }
    }
    else{
      message.channel.send("Please use first " + config.prefix + "config issues <channelid or channeltag> to choose a specific channel.")
    }
  }*/

  /*if(command === "show"){
    players = fs.readFileSync("players.json")
    players = JSON.parse(players)
    if(message.author.id in players){
      ac = players[message.author.id]["actual"]
      if(args[0] == undefined){
        if(players[message.author.id]["actual"] in players[message.author.id]["waifus"]){
          message.channel.send(players[message.author.id]["waifus"][ac])
        }
      }
      else{
        if(args[0] in players[message.author.id]["waifus"]){
          message.channel.send(players[message.author.id]["waifus"][args[0]])
        }
      }
    }
    players = JSON.stringify(players)
    fs.writeFileSync("players.json", players, (err)=>{
      if(err) throw err;
    })
  }

  if(message.author.id == "705476118865772604"){
    if(command == "destroy"){
      players = fs.readFileSync("players.json")
      players = JSON.parse(players)
      if(args[0] in players){
        players[args[0]]["waifus"] = {}
        message.channel.send("Destroyed data !")
      }
      players = JSON.stringify(players)
      fs.writeFileSync("players.json", players, (err)=>{
        if(err) throw err;
      })
    }
    if(command == "setmoney"){
      players = fs.readFileSync("players.json")
      players = JSON.parse(players)
      if(args[0] in players){
        players[args[0]]["money"] = parseInt(args[1])
        message.channel.send("Money set !")
      }
      players = JSON.stringify(players)
      fs.writeFileSync("players.json", players, (err)=>{
        if(err) throw err;
      })
    }
  }*/

  if(command == "config" && message.member.hasPermission("ADMINISTRATOR")){
    if(args[0] != undefined){
      if(args[0] == "wchannel" || args[0] == "logs"){
        if(args[1] != undefined){
          ch = message.guild.channels.cache.find(channel => channel.id === args[1])
          arg1spe = args[1].substring(2, args[1].length-1)
          ch2 = message.guild.channels.cache.find(channel => channel.id === arg1spe)
          if(ch2 != undefined){
            args[1] = arg1spe
          }
          if(ch != undefined || ch2 != undefined){
            message.channel.send("Changed !")
            servers[message.guild.id][args[0]] = args[1]
            if(servers[message.guild.id]["wchannel"] != "0"){
              channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
              msg = {
                color: 0x0099ff,
                title: "Configs",
                description: message.author.username + ' changed configs !',
                /*thumbnail: {
                  url: "member pfp",
                },*/
                timestamp: new Date(),
              };
              channel.send({ embed : msg })
            }
          }
          else{
            message.channel.send("This channel isn't in this server, or it doesn't exist !")
          }
        }
        else{
          message.channel.send("You forgot to add the channel id !")
        }
      }
      else{
        if(args[0] == "antilink"){
          if(args[1] == "on" || args[1] == "off"){
            servers[message.guild.id]["antilink"] = args[1]
            if(servers[message.guild.id]["logs"] != "0"){
              channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
              msg = {
                color: 0x0099ff,
                title: "Configs",
                description: message.author.username + ' changed configs !',
                /*thumbnail: {
                  url: "member pfp",
                },*/
                timestamp: new Date(),
              };
              channel.send({ embed : msg })
            }
          }
          else{
            message.channel.send("You need to say on or off for the second argument.")
          }
        }
        else[
          message.channel.send("The first argument does not exist.")
        ]
      }
    }
    else{
      textl = "None"
      textw = "None"
      textanti = "Off"
      if(servers[message.guild.id]["logs"] != "0"){
        textl = "Name : " + message.guild.channels.cache.find(channel => channel.id === servers[message.guild.id]["logs"]).name + "\nID : " + servers[message.guild.id]["logs"]
      }
      if(servers[message.guild.id]["wchannel"] != "0"){
        textw = "Name : " + message.guild.channels.cache.find(channel => channel.id === servers[message.guild.id]["wchannel"]).name + "\nID : " + servers[message.guild.id]["wchannel"]
      }
      if(servers[message.guild.id]["antilink"] == "on"){
        textanti = "On"
      }
      msg = {
        color: 0x0099ff,
        title: 'Configs',
        description: "Change here your configs !",
        /*thumbnail: {
          url: "member pfp",
        },*/
        fields: [
          {
              name: 'Logs channel',
              value: textl,
          },
          {
            name: 'Welcoming channel',
            value: textw,
          },
          {
            name: 'Anti-link System',
            value: textanti,
          }
        ],
        timestamp: new Date(),
      };
      message.channel.send({ embed : msg })
    }
  }

  if(command === "ban"){
    bannedsoon = message.guild.members.cache.get(args[0].substring(3,args[0].length-1))
    if(message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).hasPermission("ADMINISTRATOR")){
      message.channel.send("You can't ban an admin !")
    }
    else{
      if(message.member.hasPermission("ADMINISTRATOR")){
        reason = "None"
        if(args[1] != undefined){
          reason = message.content.substring(6 + args[0].length, message.content.length)
        }
        if(servers[message.guild.id]["logs"] != "0"){
          channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
          msg = {
            color: 0x0099ff,
            title: "Ban",
            description: message.author.username + ' banned ' + message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).displayName + "\nReason : " + reason,
            /*thumbnail: {
              url: "member pfp",
            },*/
            timestamp: new Date(),
          };
          channel.send({ embed : msg })
        }
        else{
          msg = {
            color: 0x0099ff,
            title: "Ban",
            description: message.author.username + ' banned ' + message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).displayName + "\nReason : " + reason,
            /*thumbnail: {
              url: "member pfp",
            },*/
            timestamp: new Date(),
          };
          message.channel.send({ embed : msg })
        }
        message.guild.members.ban(args[0].substring(3,args[0].length-1))
      }
      else{
        message.channel.send("You're not an admin !")
      }
    }
  }

  if(command === "help"){
    msg = {
      color: 0x0099ff,
      title: 'Help',
      description: "Here are all the commands !",
      /*thumbnail: {
        url: "member pfp",
      },*/
      fields: [
        {
            name: 'Prefix',
            value: "Prefix : " + config.prefix ,
        },
        {
            name: 'Config [<[logs or wchannel] channel id> or <antilink [on or off]>]',
            value: "Returns the config pannel / change configs\nwchannel is the welcoming channel",
        },
        /*{
          name: 'Issue [text] (dm only)',
          value: "Create a ticket for bot creators",
        },
        {
          name: 'Ans [text]',
          value: "Return the text as an answer to the ticket launcher",
        },*/
        {
          name: 'Rem [--nsfw or number]',
          value: 'Send a Rem pic'
        },
        {
          name: 'Mute member time <reason>',
          value: 'Mute a member'
        },
        {
          name: 'Kick member <reason>',
          value: 'Kick a member'
        },
        {
          name: 'Ban member <reason>',
          value: 'Ban a member'
        },
        {
          name: 'Link to invite the bot',
          value: 'https://discordapp.com/oauth2/authorize?client_id=738095192904564876&scope=bot&permissions=2146958847'
        }
      ],
      timestamp: new Date(),
    };
    message.channel.send({ embed : msg })
  }

  if(command === "kick"){
    bannedsoon = message.guild.members.cache.get(args[0].substring(3,args[0].length-1))
    if(message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).hasPermission("ADMINISTRATOR")){
      message.channel.send("You can't kick an admin !")
    }
    else{
      if(message.member.hasPermission("ADMINISTRATOR")){
        reason = "None"
        if(args[1] != undefined){
          reason = message.content.substring(6 + args[0].length, message.content.length)
        }
        if(servers[message.guild.id]["logs"] != "0"){
          channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
          msg = {
            color: 0x0099ff,
            title: "Kick",
            description: message.author.username + ' kicked ' + message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).displayName + "\nReason : " + reason,
            /*thumbnail: {
              url: "member pfp",
            },*/
            timestamp: new Date(),
          };
          channel.send({ embed : msg })
        }
        else{
          msg = {
            color: 0x0099ff,
            title: "Kick",
            description: message.author.username + ' kicked ' + message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).displayName + "\nReason : " + reason,
            /*thumbnail: {
              url: "member pfp",
            },*/
            timestamp: new Date(),
          };
          message.channel.send({ embed : msg })
        }
        message.guild.members.ban(args[0].substring(3,args[0].length-1))
        message.guild.members.unban(args[0].substring(3,args[0].length-1))
      }
      else{
        message.channel.send("You're not an admin !")
      }
    }
  }

  if(command === "mute"){
    bannedsoon = message.guild.members.cache.get(args[0].substring(3,args[0].length-1))
    if(message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).hasPermission("ADMINISTRATOR")){
      message.channel.send("You can't mute an admin !")
    }
    else{
      if(message.member.hasPermission("ADMINISTRATOR")){
        if(args[1] != undefined){
          spetime = args[1].substring(0, args[1].length - 1)
          spetime2 = args[1].substring(args[1].length - 1, args[1].length)
          if(spetime2 == "d"){
            time = spetime*24*60*60*1000
          }
          else{
            if(spetime2 == "h"){
              time = spetime*60*60*1000
            }
            else{
              if(spetime2 == "m"){
                time = spetime*60*1000
              }
              else{
                if(spetime2 == "s"){
                  time = spetime*1000
                }
                else{
                  message.channel.send("Time error !")
                  stop()
                }
              }
            }
          }
          reason = "None"
          if(args[2] != undefined){
            reason = message.content.substring(8 + args[0].length + args[1].length, message.content.length)
          }
          if(servers[message.guild.id]["logs"] != "0"){
            channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
            msg = {
              color: 0x0099ff,
              title: "Muted",
              description: message.author.username + ' muted ' + message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).displayName + "\nReason : " + reason,
              /*thumbnail: {
                url: "member pfp",
              },*/
              timestamp: new Date(),
            };
            channel.send({ embed : msg })
          }
          else{
            msg = {
              color: 0x0099ff,
              title: "Mute",
              description: message.author.username + ' muted ' + message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).displayName + "\nReason : " + reason,
              /*thumbnail: {
                url: "member pfp",
              },*/
              timestamp: new Date(),
            };
            message.channel.send({ embed : msg })
          }
          if(message.guild.roles.cache.find(x => x.name == "muted")){
          }
          else{
            message.guild.roles.create({
              data: {
                name: "muted",
                permissions: []
              },
              /*permissions:{
                CREATE_INSTANT_INVITE: false,
                KICK_MEMBERS: false,
                BAN_MEMBERS: false,
                ADMINISTRATOR: false,
                MANAGE_CHANNELS: false,
                MANAGE_GUILD: false,
                ADD_REACTIONS: false,
                READ_MESSAGES: true,
                SEND_MESSAGES: false,
                SEND_TTS_MESSAGES: false,
                MANAGE_MESSAGES: false,
                EMBED_LINKS: false,
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: true,
                MENTION_EVERYONE: false,
                EXTERNAL_EMOJIS: false,
                CONNECT: false,
                SPEAK: false,
                MUTE_MEMBERS: false,
                DEAFEN_MEMBERS: false,
                MOVE_MEMBERS: false,
                USE_VAD: false,
                CHANGE_NICKNAME: false,
                MANAGE_NICKNAMES: false,
                MANAGE_ROLES_OR_PERMISSIONS: false,
                MANAGE_WEBHOOKS: false,
                MANAGE_EMOJIS: false
              }*/
            })
          }
          listech = message.guild.channels.cache.keyArray()
          for(i = 0; i < listech.length; i++){
            message.guild.channels.cache.get(listech[i]).updateOverwrite(message.guild.roles.cache.find(x => x.name == "muted"), {SEND_MESSAGES: false}) //overwritePermissions("muted", {SEND_MESSAGES: false})
          }
          message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).roles.add(message.guild.roles.cache.find(r => r.name === "muted"))
          setTimeout(() => {
            message.guild.members.cache.get(args[0].substring(3,args[0].length-1)).roles.remove(message.guild.roles.cache.find(r => r.name === "muted"))
          }, time)
        }
        else{
          message.channel.send("You forgot to add a time !")
        }
      }
      else{
        message.channel.send("You're not an admin !")
      }
    }
  }

  /*
  if(command === "reactionrole" && message.member.hasPermission("ADMINISTRATOR")){
    if(args[0] == "list"){
      message.channel.send(Object.keys(servers[message.guild.id]["reactionrole"]))
    }
    else{
      if(args[0] == "add"){
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 300000 });
        console.log(collector)
        message.channel.send("Firstly, tag the channel.")
        collector.on('collect', message => {
          if (message.content.startsWith("<#")) {
            channelid = message.content.substring(2, 20)
            console.log(message.content)
            console.log(channelid)
            collector.stop()
          }
        })
        collector.on('end', collected => {
          const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 300000 });
          message.channel.send("Now, give me the message id please.")
          collector.on('collect', message => {
            messageid = message.content.substring(0, 20)
            console.log(message.content)
            console.log(messageid)
            collector.stop()
          })
          collector.on('end', collected => {
            message.channel.send("Now, tag the role you want to give with the emoji.")
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 300000 });
            collector.on('collect', message => {
              roleid = message.content.substring(3, 21)
              console.log(message.content)
              console.log(roleid)
              collector.stop()
            })
            collector.on('end', collected => {
              message.channel.send("Finally, send a message with only the emoji you want.")
              const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 300000 });
              collector.on('collect', message => {
                emoji = message.content
                console.log(emoji)
                collector.stop()
              })
              collector.on('end', collected => {
                //Test channel etc
                if(message.guild.channels.cache.find(c => c.id, channelid)){
                  if(message.guild.channels.cache.get(channelid).fetch(messageid)){
                    if(message.guild.roles.cache.find(r => r.id, roleid)){
                      console.log()
                      servers[message.guild.id]["reactionrole"] += {"channelid" : channelid, "messageid" : messageid, "role" : roleid, "emoji" : emoji}
                      msg = {
                        color: 0x0099ff,
                        title: "Reactionrole",
                        description: message.author.username + ' added a reactionrole ! ' + "\nChannel id : " + channelid + "\nMessage id : " + messageid + "\nRole id : " + roleid + "\nEmoji : " + emoji,
                        timestamp: new Date(),
                      };
                      message.channel.send({ embed : msg })
                      if(servers[message.guild.id]["logs"] != "0"){
                        channel = message.guild.channels.cache.get(servers[message.guild.id]["logs"])
                        channel.send({ embed : msg }) 
                      }
                    }
                    else{
                      message.channel.send("The role isn't in the server !")
                    }
                  }
                  else{
                    message.channel.send("The message isn't in the channel !")
                  }
                }
                else{
                  message.channel.send("The channel isn't in the server !")
                }
              })
            })
          })
        });
      }
    }
  }
  */

  servers = JSON.stringify(servers)
  fs.writeFileSync("serverconfigs.json", servers, (err)=>{
    if(err) throw err;
  })
});

client.login(process.env.TOKEN);
