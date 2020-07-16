const { PI } = Math;

const rightAngle = (angle, MAX_ANGLE) => {
  let a = angle;
  if (a > 0) {
    a = (a < PI - MAX_ANGLE) ? (PI - MAX_ANGLE) : a;
  } else {
    a = (a > -PI + MAX_ANGLE) ? (-PI + MAX_ANGLE) : a;
  }
  return a;
};

const leftAngle = (angle, MAX_ANGLE) => {
  let a = angle;
  if (a > 0) {
    a = (a > MAX_ANGLE) ? MAX_ANGLE : a;
  } else {
    a = (a < -MAX_ANGLE) ? -MAX_ANGLE : a;
  }
  return a;
};

export { rightAngle, leftAngle };
