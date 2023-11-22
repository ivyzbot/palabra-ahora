export default function randomSelect(num, length) {
  let result = [];
  for (let i = 0; i < num; i++) {
    result.push(Math.floor(Math.random() * length) + 1);
  }
  return result;
}
