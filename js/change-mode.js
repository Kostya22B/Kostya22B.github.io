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

function updateHistory(sectionId) {
  const sectionTitle = document.getElementById(sectionId).querySelector('.sectionTitle').textContent.trim();
  const url = `#${sectionId}`;

  history.pushState({ sectionId, sectionTitle }, '', url);
}

window.addEventListener('popstate', event => {
  const state = event.state;
  if (state) {
      const section = document.getElementById(state.sectionId);
      if (section) {
          section.scrollIntoView({
              behavior: 'smooth'
          });
      }
  }
});
