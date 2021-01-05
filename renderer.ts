function test(): void {
  console.log('test');
}

// デバッガーがレンダラープロセスに接続するのに時間がかかるため3秒待つ
setTimeout(() => {
  test();
}, 3000);
