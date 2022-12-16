const btnLeft = document.querySelector("#slide-left");
const btnRight = document.querySelector("#slide-right");
const container = document.querySelector(".slider");

export function sliderToggle() {

    btnRight.addEventListener("click", (e) => {
    e.preventDefault();
  
    container.scrollLeft += 300;
  
    });

    btnLeft.addEventListener("click", (e) => {
      e.preventDefault();
    
      container.scrollLeft -= 300;
    
      });
      
}