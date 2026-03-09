import { Router } from "express"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"

/* Controller */
import { getUserByIdController, deleteUserByIdController, updateUserController, uploadAvatarController, requestPasswordResetController, verifyResetCodeController, updatePasswordController } from "../controllers/user.controller.js"

/* Middleware */
import { upload } from "../middlewares/upload.middleware.js"


const router = Router()



// /api/users

// GET
router.get("/me", verifyToken, getUserByIdController)


// POST
router.post("/avatar", verifyToken, upload.single("avatar"), uploadAvatarController)

  // Reset password forgot
router.post("/request-reset", requestPasswordResetController)

router.post("/verify-code", verifyResetCodeController)

router.post("/reset-password", updatePasswordController)


// PUT
router.put("/update", verifyToken, updateUserController)


// DELETE
router.delete("/delete-account", verifyToken, deleteUserByIdController)


export default router