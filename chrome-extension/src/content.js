let panelAttached = false

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'STREAM_CHUNK') {
    window.lessonLifterPanel?.appendChunk(msg.payload)
  }
})

async function runLessonLifter() {
  const selection = window.getSelection().toString()
  const text = selection || document.body.innerText.slice(0, 8000)
  if (!panelAttached) injectPanel()
  chrome.runtime.sendMessage({
    type: 'GENERATE_ASSETS',
    payload: { text, url: location.href }
  })
}

function injectPanel() {
  const panel = document.createElement('div')
  panel.id = 'lesson-lifter-panel'
  panel.style = 'all: initial; position:fixed; top:0; right:0; width:340px; height:100%; z-index:999999;'
  panel.innerHTML = `<iframe src="${chrome.runtime.getURL('src/panel.html')}" style="width:100%; height:100%; border:none;"></iframe>`
  document.documentElement.appendChild(panel)
  panelAttached = true
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'lessonLifter',
    title: 'Generate lesson assets',
    contexts: ['selection', 'page']
  })
})

chrome.contextMenus.onClicked.addListener(runLessonLifter)
