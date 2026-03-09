/* Services */
import { clickRewardService, claimRewardService } from "../services/game.service.js"



// Reward by click user
export const clickRewardController = async (req: any, res: any) => {
  try {
    
    const user_id = req.user.user_id

    const { clicks } = req.body

    if (!Number.isInteger(clicks) || clicks <= 0) {
      return res.status(400).json({
        message: "Invalid clicks value"
      })
    }
    
    const reward = await clickRewardService(user_id, clicks)

    res.json({ reward })

  } catch (error: any) {

    res.status(500).json({
      message: "Error processing click reward"
    })
    
  }
}



// Claim reward
export const claimRewardController = async (req: any, res: any) => {
  try {
    
    const user_id = req.user.user_id

    const reward = await claimRewardService(user_id)
    
    res.json({ reward })

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    })
    
  }
}