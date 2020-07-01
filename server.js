// node server.js String::MCserverDirectoryPath String::serverJarFileName
const proc = require('child_process');
var MCservers = {} // サーバープロセスの集合体

// グローバルネームスペース
var MCserverManager = MCserverManager || {};
// サブネームスペース
MCserverManager.Server = {
    Init: function(Name) {
        MCservers[Name] = false;
    },
    Start: function(Name, DirectoryPath, JarFileName) {
        if (Object.keys(MCservers).includes(Name)) {
            return false;
        } else {
            // サーバーの実行
            MCservers[Name] = proc.spawn(
                // "java", ['-jar', argv[3], 'nogui'], { cwd: argv[2] } // サーバーファイルのディレクトリ
                "java", ['-jar', DirectoryPath, 'nogui'], { cwd: JarFileName } // サーバーファイルのディレクトリ
            );
            // ログ
            Function(`
            "use strict";
            MCservers[` + Name + `].stdout.on('data', function(log) {
                SendLog(` + Name + `, log)
            });
            MCservers[` + Name + `].stderr.on('data', function(log) {
                SendLog(` + Name + `, log);
            });
            `)();
            return true;
        }
    },
    Get: function(Name) {
        if (Object.keys(MCservers).includes(Name)) {
            return MCservers[Name];
        }
        return false;
    },
    Command: function(Name, command) {
        if (Object.keys(MCservers).includes(Name)) {
            MCservers[Name].stdin.write(command + "\r");
            return true;
        } else {
            return false;
        }
    }
};

function SendLog(serverName, massage) {
    MCserverManager.Discord.ServerLog(serverName, massage);
}



/*
const http = require('http');
const { getServers } = require('dns');

const hostname = '127.0.0.1';
const port = 3500;

const webServer = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');

    // ログを表示する
    MCserver.stdout.on('data', function(log) {
        res.end(log + '\n');
    });
    MCserver.stderr.on('data', function(log) {
        res.end(log + '\n');
    });
});


webServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/





// コマンドを実行する 以下ではhelpコマンドを実行している
MCserver.stdin.write("help" + "\r");