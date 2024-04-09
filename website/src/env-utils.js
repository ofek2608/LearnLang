export function isTouchScreenDevice() {
  try{
    document.createEvent('TouchEvent');
    return true;
  } catch(e) {
    return false;
  }
}

export function isViewVertical() {
  return window.innerWidth <= window.innerHeight;
}
