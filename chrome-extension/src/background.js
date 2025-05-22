import buildPrompt from './utils/promptBuilder.js'

chrome.runtime.onMessage.addListener(async (msg, sender, respond) => {
  if (msg.type === 'GENERATE_ASSETS') {
    try {
      const { OPENAI_KEY } = await chrome.storage.sync.get('OPENAI_KEY')
      const prompt = buildPrompt(msg.payload.text, msg.payload.url)

      const stream = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          stream: true
        })
      })

      const reader = stream.body.getReader()
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        chrome.tabs.sendMessage(sender.tab.id, {
          type: 'STREAM_CHUNK',
          payload: new TextDecoder().decode(value)
        })
      }
    } catch (err) {
      respond({ error: err.message })
    }
  }
  return true
})
