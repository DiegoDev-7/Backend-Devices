/* Services */
import { createBankService, getBankByUserService, verifyLast4DigitsService } from "../services/bank.service.js"



// Get account bank by user
export const getBankByUserController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)
    
    const bank = await getBankByUserService(user_id)

    res.status(200).json({
      message: "Bank data obtained",
      bank
    })

  } catch (error: any) {
    
    res.status(500).json({
      error: "Error retrieving bank account data"
    })

  }
}



// Check last 4 digits card code
export const verifyLast4DigitsController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)
    
    const { last4 } = req.body

    if (!last4 || last4.length !== 4) {
      return res.status(400).json({
        message: "You must send exactly 4 digits"
      })
    }

    await verifyLast4DigitsService(user_id, last4)

    return res.json({
      success: true,
      message: "Correct code"
    })
    
  } catch (error: any) {

    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" })
    }

    if (error.message === "Invalid code") {
      return res.status(401).json({ error: "Wrong code" })
    }

    return res.status(500).json({ error: "Server error" })
    
  }
}



// Create account to the bank with the user_id
export const createBankATMController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)

    const bank = await createBankService(user_id)

    
    if (!bank) {
      res.status(400).json({
        message: "Couldn't create bank because user is not valid"
      })
    }

    res.status(201).json({
      message: "Bank account created",
      bank
    })

  } catch (error: any) {

    res.status(500).json({ 
      error: "Error creating Bank account"
    })

  }
}