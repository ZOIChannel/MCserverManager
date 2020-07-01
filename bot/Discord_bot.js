// コンフィグ読み込み
// var conf = require('config');
// Discord
const Discord = require("discord.js");
var Clients = {};
var ServerLogChannels = {};
// const client = new Discord.Client();
// const token = conf.Discord.Token;

// グローバルネームスペース
var MCserverManager = MCserverManager || {};
// サブネームスペース
MCserverManager.Discord = {
    Init: function(Name, LogChannel, directoryPath, jarFileName) {
        if (Object.keys(Clients).includes(Name)) {
            return false;
        } else {
            Clients[Name] = new Discord.Client();
            ServerLogChannels[Name] = LogChannel;
            // bot実行時
            Clients[Name].on("ready", () => {
                Clients[Name].channels.cache.get(LogChannel).send('MinecraftサーバーBotがログインしました。')
            });
            Clients[Name].on("message", message => {
                // bot除外
                if (message.author.bot) {
                    return;
                } else {
                    let msg = message.content;
                    let channel = message.channel;
                    let author = message.author.username;
                    // startコマンド時
                    if (msg.slice(0, 5) == "start") {
                        var name = msg.slice(6)
                        if (MCserverManager.Server.Get) {
                            Clients[Name].channels.cache.get(LogChannel).send("Starting \"" + name + "\"...");
                            MCserverManager.Server.Start(name, directoryPath, jarFileName);
                            break;
                        } else {
                            Clients[Name].channels.cache.get(LogChannel).send("\"" + name + "\"という名前のサーバーはありません。");
                            break;
                        }
                    } else {
                        if (channel.id == server_1_channel) {
                            MCserverManager.Server.Get.stdin.write(msg + "\r")
                        }
                        return;
                    }
                }
            });
        }
    },
    Start: function(Name, token) {
        Clients[Name].login(token);
    },
    ServerLog: function(Name, massage) {
        Clients[Name].channels.cache.get(ServerLogChannels[Name]).send(massage);
    },
    ServerError: function(Name, massage) {
        Clients[Name].channels.cache.get(ServerLogChannels[Name]).send("!!! Error !!!\n---***** *****---\n" + massage + "---***** *****---");
    }
};