/* Services */
import { createBankService, getBankByUserService } from "../services/bank.service.js"



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