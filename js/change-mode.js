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

/**
* @brief Updates the history to reflect the changes in the section
* @param sectionId The id of the section
*/
function updateHistory(sectionId) {
  const sectionTitle = document.getElementById(sectionId).querySelector('.sectionTitle').textContent.trim();
  const url = `#${sectionId}`;

  history.pushState({ sectionId, sectionTitle }, '', url);
}

window.addEventListener('popstate', event => {
  const state = event.state;
  // Scrolls the section to the current state.
  if (state) {
      const section = document.getElementById(state.sectionId);
      // Scrolls the section to the bottom of the section.
      if (section) {
          section.scrollIntoView({
              behavior: 'smooth'
          });
      }
  }
});
