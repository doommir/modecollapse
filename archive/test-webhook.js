#!/usr/bin/env node

/**
 * Test script for the n8n webhook integration
 * This simulates a tool submission to verify the webhook is working
 * 
 * Usage: node test-webhook.js
 */

const testToolData = {
  name: "Test AI Tool",
  url: "https://example.com",
  summary: "This is a test tool submission to verify webhook integration",
  description: "A longer description of the test tool with more details about its features and capabilities.",
  tags: ["Test", "Automation", "API"],
  promptTips: "Use this tool by asking specific questions and providing clear context.",
  submittedAt: new Date().toISOString(),
  source: "mode-collapse-website"
}

async function testWebhook() {
  const webhookUrl = 'http://localhost:5678/webhook/mode-collapse-submit'
  
  console.log('🧪 Testing n8n webhook integration...')
  console.log('📍 Webhook URL:', webhookUrl)
  console.log('📦 Test data:', JSON.stringify(testToolData, null, 2))
  console.log('')

  try {
    console.log('📡 Sending POST request...')
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testToolData)
    })

    console.log('📈 Response status:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response')
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}\\n${errorText}`)
    }

    let responseData
    try {
      responseData = await response.json()
      console.log('📄 Response data:', JSON.stringify(responseData, null, 2))
    } catch {
      const responseText = await response.text()
      console.log('📄 Response text:', responseText || '(empty response)')
    }

    console.log('\\n✅ SUCCESS: Webhook test completed successfully!')
    console.log('🎯 Your n8n workflow should have received the test data.')
    
    return true

  } catch (error) {
    console.error('\\n❌ FAILED: Webhook test failed')
    
    if (error.message.includes('fetch')) {
      console.error('🔌 Connection error: Make sure n8n is running on localhost:5678')
      console.error('   Start n8n with: npm install -g n8n && n8n start')
    } else if (error.message.includes('404')) {
      console.error('🎯 Webhook not found: Check that the webhook URL exists in n8n')
      console.error('   Expected URL: http://localhost:5678/webhook/mode-collapse-submit')
    } else {
      console.error('💥 Error details:', error.message)
    }
    
    return false
  }
}

async function main() {
  console.log('=' .repeat(60))
  console.log('🚀 N8N WEBHOOK TEST')
  console.log('=' .repeat(60))
  
  const success = await testWebhook()
  
  console.log('\\n' + '=' .repeat(60))
  if (success) {
    console.log('🎉 Test completed successfully!')
    console.log('📋 Next steps:')
    console.log('   1. Check your n8n workflow execution history')
    console.log('   2. Verify the data was processed correctly')
    console.log('   3. Test the form on your website: /submit-tool')
  } else {
    console.log('⚠️  Test failed - see errors above')
    console.log('📋 Troubleshooting:')
    console.log('   1. Ensure n8n is running: n8n start')
    console.log('   2. Check webhook URL in n8n dashboard')
    console.log('   3. Verify webhook is listening on correct endpoint')
  }
  console.log('=' .repeat(60))
}

// Run the test
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { testWebhook }