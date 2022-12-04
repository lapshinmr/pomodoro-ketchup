export const showNotification = (title, text) => {
  if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification(title, {
      body: text,
    });
  }
};

export const playSound = (soundPath) => {
  const audio = new Audio(soundPath);
  audio.play();
};
