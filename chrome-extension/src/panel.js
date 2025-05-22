window.lessonLifterPanel = {
  appendChunk(chunk) {
    const el = document.getElementById('output')
    el.textContent += chunk
  }
}
