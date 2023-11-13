export default function formatDate(inputDate) {
  if (!inputDate) {
    return "";
  }
  var date = new Date(inputDate);
  var day = date.getDate().toString().padStart(2, "0");
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var year = date.getFullYear();
  return day + "/" + month + "/" + year;
}
