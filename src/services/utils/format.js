export const getTiming = (boilTime, timing) => {
  if (timing === boilTime) {
    return "End";
  } else if (!timing) {
    return "Start";
  }
  return `${timing} mins`;
};
