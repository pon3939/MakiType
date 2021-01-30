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
    // 絶対パス指定できるようにする
    const requestedUrl: string = req.url.replace('file://', '');

    if (path.isAbsolute(requestedUrl)) {
      callback(
        path.normalize(
          path.join(__dirname.replace('\\src\\js', ''), requestedUrl)
        )
      );
    } else {
      callback(requestedUrl);
    }
  });

  // ウィンドウの初期設定
  const isTest: boolean = process.env.NODE_ENV === 'test';
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: isTest,
      enableRemoteModule: isTest,
    },
  });
  mainWindow.loadURL('file:///src/html/top.html');
  mainWindow.maximize();
  // メニューバー削除
  if (app.isPackaged) {
    mainWindow.setMenu(null);
  } else {
    // 開発環境では開発者ツールを使いたいから非表示にするだけ
    mainWindow.setMenuBarVisibility(false);
  }

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // ちらつき防止のため描画完了してからウィンドウを表示する
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
  });
});
