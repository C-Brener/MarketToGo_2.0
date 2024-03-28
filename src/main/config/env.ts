export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/market-to-go-prod',
  port: process.env.PORT ?? 5050
}
