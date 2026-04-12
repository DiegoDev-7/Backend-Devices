import { Router } from "express"

/* Controllers */
import { getLeaderboardController, getMyRankController } from "../controllers/leaderboard.controller.js"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"


const router = Router()


// /api/leaderboard

// GET
/* 

  GET /api/leaderboard?metric=total_transactions&order=DESC&page=0
  __________________________________________________
  | parameter | description                         |
  | --------- | ----------------------------------- |
  |           |  bank_balance                       |
  |           |  atm_balance                        |
  | "metric"  |  total_balance                      |
  |           |  total_transactions                 |
  |           |  total_contacts                     |
  |           |                                     |
  | "order"   |  Order leaderboard (DESC or ASC)    |
  |           |                                     |
  | "page"    |  Page counter                       |
  |_________________________________________________|

*/
router.get("/", getLeaderboardController)

router.get("/me/rank", verifyToken, getMyRankController)


export default router