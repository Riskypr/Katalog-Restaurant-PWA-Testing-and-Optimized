const SpinnerLoading = {
  show () {
    const spinner = document.createElement('div')
    spinner.id = 'spinner'
    spinner.innerHTML = `
      <section class="spinner-container">
        <div class="spinner"></div>
      </section>
    `
    document.body.appendChild(spinner)
  },

  hide () {
    const spinner = document.getElementById('spinner')
    if (spinner) {
      spinner.remove()
    }
  },

  showOfflineMessage () {
    const offlineMessage = document.createElement('div')
    offlineMessage.id = 'offline-message'
    offlineMessage.innerHTML = `
      <section class="offline-container">
        <p class="offline-text">You are offline. Please check your internet connection.</p>
      </section>
    `
    document.body.appendChild(offlineMessage)
  },

  hideOfflineMessage () {
    const offlineMessage = document.getElementById('offline-message')
    if (offlineMessage) {
      offlineMessage.remove()
    }
  }
}

export default SpinnerLoading
