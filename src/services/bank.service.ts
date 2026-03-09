/* Model */
import { createBankModel, getBankModel } from "../model/bank.model.js"



// Get account bank by user
export const getBankByUserService = async (
  user_id: number
) => {
  try {
    
    const bank = await getBankModel(user_id)

    if (!bank) return null

    return bank
    
  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }

  }
}



// Create bank by user_id
// Generate code in the card
const generateCardNumber = () => {
  let card = ""

  for (let i = 0; i < 16; i++) {
    card += Math.floor(Math.random() * 10)
  }

  return card
}
export const createBankService = async (
  user_id: number
) => {

  let bank
  let created = false

  while (!created) {
    
    const card = generateCardNumber()

    try {

      bank = await createBankModel(user_id, card)

      created = true

    } catch (error: any) {
      
      if (error.code !== "23505") {
        throw new Error("User already has a bank account")
      } else {
        throw error
      }
      
    }
  }

  return bank
  
}