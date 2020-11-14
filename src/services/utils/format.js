export const getTiming = (boilTime, timing) => {
  if (timing === boilTime) {
    return "End";
  } else if (timing === 0) {
    return "Start";
  }
  return timing;
};
