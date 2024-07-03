export default function debounceFunction(fn) {
  let time;

  return function (...args) {
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      fn(...args);
    }, 300);
  };
}
