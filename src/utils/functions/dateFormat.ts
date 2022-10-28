export default function dateFormat(date: any) {
  const newDate = new Date(date);
  return (
    newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear()
  );
}
