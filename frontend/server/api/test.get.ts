export default defineEventHandler(async (event) => {
  return {
    success: true,
    message: '这是一个测试 API 响应',
    timestamp: new Date().toISOString(),
    data: {
      userId: 12345,
      username: 'testuser',
      email: 'test@example.com'
    }
  }
})
