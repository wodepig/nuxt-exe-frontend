export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return {
    success: true,
    message: '你好！收到你的 POST 请求',
    timestamp: new Date().toISOString(),
    receivedData: body || {}
  }
})
