export function getWindowSize(pixel) {
  return window.matchMedia(`(max-width : ${pixel.toString()}px)`).matches;
}
