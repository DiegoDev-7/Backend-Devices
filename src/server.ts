import app from "./app.js"

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

app.listen(PORT, () => {
  console.log(`Port running in port: http://localhost:${PORT}`)
})

export default app