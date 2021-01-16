const exitButton: HTMLElement | null = document.getElementById('exit-button');

if (exitButton) {
  exitButton.onclick = () => {
    window.close();
  };
}
