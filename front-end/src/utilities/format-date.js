/**
 * Format a given date in the format DD/MM/YYYY.
 * @param {string} inputDate - The input date in string format.
 * @returns {string} - The formatted date (DD/MM/YYYY) or an empty string if the input is falsy.
 */
export default function formatDate(inputDate) {
  // Check if the input date is falsy
  if (!inputDate) {
    return "";
  }

  // Create a new Date object from the input date string
  var date = new Date(inputDate);

  // Get the day, month, and year from the date object
  var day = date.getDate().toString().padStart(2, "0");
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var year = date.getFullYear();

  // Return the formatted date in the format DD/MM/YYYY
  return day + "/" + month + "/" + year;
}
