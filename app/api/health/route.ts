export async function GET() {
  return Response.json({ 
    status: 'ok',
    message: 'Mode Collapse API is running',
    timestamp: new Date().toISOString(),
    commit: 'latest-with-simplified-components'
  });
}