document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('mode_button').onclick = function(){
    let isdark = document.documentElement.classList.contains("dark");
    if (isdark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }
})
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});