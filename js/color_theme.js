//change-mode
document.addEventListener('DOMContentLoaded', function(){
  /**
  * @brief / / object
  */
  document.getElementById('mode_button').onclick = function(){
    let isdark = document.documentElement.classList.contains("dark");
    // Removes the dark class from the list of classes.
    if (isdark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }
})
