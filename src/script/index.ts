// Electronのモジュール
import { app, BrowserWindow, protocol } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import * as path from 'path';

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow: BrowserWindow | null = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', () => {
  protocol.interceptFileProtocol('file', (req, callback) => {
    // srcをルートディレクトリとして絶対パス指定できるようにする
    const requestedUrl = req.url.replace('file://', '');

    if (path.isAbsolute(requestedUrl)) {
      callback(
        path.normalize(
          path.join(__dirname.replace('\\src\\script', ''), requestedUrl)
        )
      );
    } else {
      callback(requestedUrl);
    }
  });

  // ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
  });

  // 使用するhtmlファイルを指定する
  mainWindow.loadURL('file:///src/html/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
