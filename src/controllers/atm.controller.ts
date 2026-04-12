/* Services */
import { createATMService, getAtmByUserService } from "../services/atm.service.js"



// Get account ATM by user
export const getAtmByUserController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)
    
    const atm = await getAtmByUserService(user_id)

    res.status(200).json({
      message: "Atm data obtained",
      atm
    })

  } catch (error: any) {

    if (error.message === "Atm not created") {
      return res.status(404).json({ error: "Atm not created" })
    }
    
    res.status(500).json({
      error: "Error retrieving bank account data"
    })

  }
}



// Create account to the atm by user_id
export const createATMController = async (req: any, res: any) => {
  try {
    const user_id = Number(req.user.user_id)

    const atm = await createATMService(user_id)

     if (!atm) {
      res.status(400).json({
        message: "Couldn't create atm because user is not valid"
      })
    }

    res.status(201).json({
      message: "Atm account created",
      atm
    })


  } catch (error) {
    
    res.status(500).json({ 
      error: "Error creating Atm account"
    })

  }
}