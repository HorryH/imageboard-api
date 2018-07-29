
export default function hot(points, currentDate) {
  const order = Math.log10(Math.max(Math.abs(points), 1));
  const sign = Math.sign(points);
  const seconds = currentDate - 1134028003;
  return sign * order + seconds / 45000;
}