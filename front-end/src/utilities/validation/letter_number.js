export default function letterNumberValid(number) {
  const regEx = /^(\d+)(?:\/(\d+))?$/g;
  return regEx.test(number);
}
