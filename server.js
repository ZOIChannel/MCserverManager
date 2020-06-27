// node server.js String::MCserverDirectoryPath String::serverJarFileName
const proc = require('child_process');

// サーバーの実行
var MCserver = proc.spawn(
    "java",
    ['-jar', argv[3], 'nogui'],
    { cwd: argv[2] } // サーバーファイルのディレクトリ
);


const http = require('http');

const hostname = '127.0.0.1';
const port = 3500;

const webServer = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');

    // ログを表示する
    MCserver.stdout.on('data', function (log) {
        res.end(log + '\n');
    });
    MCserver.stderr.on('data', function (log) {
        res.end(log + '\n');
    });
});


webServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});






// コマンドを実行する 以下ではhelpコマンドを実行している
MCserver.stdin.write("help" + "\r");