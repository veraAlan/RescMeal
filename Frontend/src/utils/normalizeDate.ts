export default function normalizeDate(date: String) {
   return date.slice(0, 10).split('-').reverse().join('/');
}