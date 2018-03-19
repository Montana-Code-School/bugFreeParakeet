

function stringShortener(string){
  //knocks the last Character off of a string
  //helps to correctly submit option in submit.js
  var arr = string.split("");
  arr.pop();
  string = arr.join("");
  return string;
}
export default stringShortener;
