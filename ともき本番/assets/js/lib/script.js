// function addListener(){
    //   document.addEventListener("DOMContentLoaded", function(){
    //   // .addEventListener("showDialog", function(){
      var rangeSlider = document.getElementById("rs-range-line");
      var rangeBullet = document.getElementById("rs-bullet");
      // console.log(document.getElementById("rs-range-line"));
      // console.log(rangeBullet);
      rangeSlider.addEventListener("input", showSliderValue, false);
    //   },false);
//   }
    
 function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * 578) + "px";
}