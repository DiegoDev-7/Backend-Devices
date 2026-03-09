/* Model */
import { createATMModel, getAtmModel } from "../model/atm.model.js"



// Get account ATM by user
export const getAtmByUserService = async (
  user_id: number
) => {
  try {
    
    const atm = await getAtmModel(user_id)

    if (!atm) return null

    return atm

  } catch (error: any) {

    if (error.code !== "23505") {
      throw error
    }
    
  }
}



// Create ATM by user_id
export const createATMService = async (
  user_id: number
) => {
  try {

    const atm = await createATMModel(user_id)

    if (!atm) return null

    return atm

  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }

  }
}