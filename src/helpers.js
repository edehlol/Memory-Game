export const formatTime = (timer) => {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  } else if (seconds > 59) {
    seconds = seconds % 60;
  }
  return `${minutes}:${seconds}`;
};
