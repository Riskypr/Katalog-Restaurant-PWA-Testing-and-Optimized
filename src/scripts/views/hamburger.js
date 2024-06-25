export function setupHamburgerMenu () {
  const dropdown = document.querySelector('.hamburger-menu')
  const navBar = document.querySelector('nav')

  if (dropdown && navBar) {
    dropdown.onclick = function () {
      navBar.classList.toggle('open')
    }

    dropdown.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        navBar.classList.toggle('open')
        event.preventDefault()
      }
    })
  }

  const menuItems = document.querySelectorAll('.nav-links a')
  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      navBar.classList.remove('open')
    })
  })
}
