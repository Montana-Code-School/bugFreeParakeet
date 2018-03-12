

function stringShortener(string){
  var arr = string.split("");
  arr.pop();
  string = arr.join("");
  return string;
}
export default stringShortener;
