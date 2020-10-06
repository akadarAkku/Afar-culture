const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});


//Qaada image

$(function(){

  $('#show').on('click',function(){        
      $('.card-reveal').slideToggle('slow');
  });
  
  $('.card-reveal .close').on('click',function(){
      $('.card-reveal').slideToggle('slow');
  });
});


//tex animation


