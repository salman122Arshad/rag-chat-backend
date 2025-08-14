export default () => ({
  port: parseInt(process.env.PORT ?? '8080', 10),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://mongo:27017/rag_chat',
  apiKey: process.env.API_KEY ?? '',
});
