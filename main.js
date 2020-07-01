const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on('ready', () => {
    // webServer
    // const webProc = require('child_process');
    // サーバーの実行
    /*
    var server = webProc.spawn(
        "node", ['server.js', '/Users/haruto/Desktop/server/1.12.2/GtT1.12.2', 'minecraft_server.1.12.2.jar'], { cwd: __dirname } // サーバーファイルのディレクトリ
    );
    //*/


    // mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
    mainWindow = new BrowserWindow({ width: 400, height: 300 });
    // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
    // mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.loadURL('http://localhost:3500');

    // ChromiumのDevツールを開く
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});