export default function dateFormat(date: any) {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  return newDate.getDate() + "/" + month + "/" + newDate.getFullYear();
}
