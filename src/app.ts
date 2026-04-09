import express from "express"
import cors from "cors"

/* Routes */
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import bankRoutes from "./routes/bank.routes.js"
import atmRoutes from "./routes/atm.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
import supportEmail from "./routes/support.routes.js"
import gameRoutes from "./routes/game.routes.js"
import radioRoutes from "./routes/radio.routes.js"



const app = express()

app.use(cors({
  origin: [
    process.env.FRONTEND_URL as string,
    process.env.FRONTEND_PROD as string,
    process.env.FRONTEND_PROD2 as string
  ],
  credentials: true
}))
app.use(express.json())


app.get("/", async (_, res: any) => {
  res.send("Welcome to the API NEXIA")
})



// User
app.use("/api/users", userRoutes)


// Auth
app.use("/api/auth", authRoutes)


// Bank
app.use("/api/bank", bankRoutes)


// ATM
app.use("/api/atm", atmRoutes)


// Transaction
app.use("/api/transaction", transactionRoutes)


// Support
app.use("/api/support", supportEmail)


// Game
app.use("/api/game", gameRoutes)


// Radio
app.use("/api/radio", radioRoutes)


export default app