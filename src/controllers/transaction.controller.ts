/* Services */
import { bankToATMService, atmToBankService, atmToUserService, getTransactionService } from "../services/transaction.service.js"



// Receipt from the transfer
export const getTransactionController = async (req: any, res: any) => {
  try {
    
    const user_id = Number(req.user.user_id)
    const page = parseInt(req.query.page) | 1
    const limit = parseInt(req.query.limit) | 10
    const type = req.query.type || null

    const receipt = await getTransactionService(
      user_id,
      page,
      limit,
      type
    )

    res.status(200).json(receipt)

  } catch (error: any) {
    
    res.status(500).json({ 
      message: "Error fetching transaction history" 
    })

  }
}



// Bank --> ATM
export const sendBankToATMController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)
    
    const { amount } = req.body

    const transaction = await bankToATMService(user_id, amount)

    res.status(200).json(transaction)

  } catch (error: any) {

    res.status(500).json({ message: "Transfer failed" })

  }
}



// ATM --> Bank
export const sendATMToBankController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)

    const { amount } = req.body

    const transaction = await atmToBankService(user_id, amount)

    res.status(200).json(transaction)

  } catch (error: any) {

    res.status(500).json({ message: "Transfer failed" })

  }
}



// ATM --> User phone
export const sendATMToUserController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)

    const { phone, amount } = req.body

    const transaction = await atmToUserService(user_id, phone, amount)

    res.status(200).json(transaction)

  } catch (error: any) {

    res.status(500).json({ message: "Transfer failed" })

  }
}