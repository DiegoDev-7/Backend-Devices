/* Models */
import { addMoneyToBankModel, addRewardToBankModel, getLastRewardModel, updateLastRewardModel } from "../model/game.model.js"



// Click reward by user
export const clickRewardService = async (
  user_id: number,
  clicks: number
) => {
  try {

    let totalReward = 0

    for (let i = 0; i < clicks; i++) {

      const reward = Math.floor(
        (Math.random() * 7 + 1) * clicks
      )

      totalReward += reward

    }

    await addMoneyToBankModel(user_id, totalReward)

    return totalReward

  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }

  }
}



// Claim reward with timer
export const claimRewardService = async (
  user_id: number
) => {
  try {

    const lastReward = await getLastRewardModel(user_id)

    const now = new Date()

    if (lastReward) {

      const last = new Date(lastReward)

      const diff = now.getTime() - last.getTime()

      const tenMinutes = 10 * 60 * 1000

      if (diff < tenMinutes) {

        const remaining = Math.ceil((tenMinutes - diff) / 1000)

        throw new Error(`Wait ${remaining} seconds to claim reward`)

      }

    }

    const reward = Math.floor(Math.random() * 4001) + 1000

    await addRewardToBankModel(user_id, reward)

    await updateLastRewardModel(user_id)

    return reward

  } catch (error: any) {

    throw error
    
  }
}