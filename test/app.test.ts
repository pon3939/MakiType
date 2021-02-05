import { Application } from 'spectron';
import { join } from 'path';

let app: Application;

// 初期化
beforeAll(
  (): Promise<Application> => {
    const isWindows: boolean = process.platform === 'win32';
    const ext: string = isWindows ? '.cmd' : '';
    const electronPath: string = join('node_modules', '.bin', `electron${ext}`);

    app = new Application({
      path: electronPath,
      args: ['.'],
    });
    return app.start();
  }
);

// 後処理
afterAll((): Promise<Application> | undefined => {
  if (app && app.isRunning()) {
    return app.stop();
  }

  return undefined;
});

test('ウィンドウタイトルがMaki Typeか', (done: jest.DoneCallback): void => {
  app.client
    .getTitle()
    .then((title: string): void => {
      expect(title).toBe('Maki Type');
      done();
    })
    .catch((error): void => {
      done(error);
    });
});
