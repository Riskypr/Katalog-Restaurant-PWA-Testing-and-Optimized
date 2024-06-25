export function setupHeaderScroll () {
  document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header')

    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
          header.classList.add('header-background')
        } else {
          header.classList.remove('header-background')
        }
      })
    }
  })

  document.querySelector('.skip-link').addEventListener('click', function (e) {
    e.preventDefault()
    const targetElement = document.getElementById('main-content')
    targetElement.focus()
    // Scroll to the top of the target element
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Ensure focus is set after scrolling completes
    targetElement.addEventListener('scroll', function handleScroll () {
      targetElement.removeEventListener('scroll', handleScroll)
    })
  })
}
