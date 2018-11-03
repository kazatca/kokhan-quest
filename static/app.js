function onReady() {
  const blurs = document.querySelectorAll('.blur');
  if(blurs.length >= 2){
    blurs[blurs.length-2].scrollIntoView();
  }
}

document.addEventListener("DOMContentLoaded", onReady);