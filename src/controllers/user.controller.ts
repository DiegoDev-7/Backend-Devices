import bcrypt from "bcrypt"

/* Services */
import { createResetCodeService, deleteUserByIdService, getUsersByIdService, updateAvatarService, updatePasswordService, updateUserSerive, verifyResetCodeService } from "../services/user.service.js"

/* Cloudinary (save images) */
import cloudinary from "../config/cloudinary.js"
import { getUserByEmailService } from "../services/auth.service.js"

/* Utils */
import { sendEmailUtils } from "../utils/email.utils.js"
import { htmlTemplateRecoveryPassword } from "../utils/email.templates.js"
import { sendDeleteAccountService } from "../services/email.service.js"



// GET user by user_id
export const getUserByIdController = async (req: any, res: any) => {
  try {
    
    const user_id = Number(req.user?.user_id)

    if (!user_id || isNaN(user_id)) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const user = await getUsersByIdService(user_id)

    if (!user) {
      return res.status(404).json({ 
        message: "User not found" 
      })
    }

    res.json(user)

  } catch (error: any) {

    res.status(500).json({ 
      message: "Error getting user" 
    })

  }
}



// Update user
export const updateUserController = async (req: any, res: any) => {

  try {
    
    const user_id = Number(req.user.user_id)

    const { name, lastName, password, avatar } = req.body

    let hashedPassword = null

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    const user = await updateUserSerive(
      user_id,
      name,
      lastName,
      hashedPassword,
      avatar
    )

    res.json(user)

  } catch (error: any) {
    
    res.status(500).json({
      message: "Error updating user"
    })

  }

}



// Update avatar
export const uploadAvatarController = async (req: any, res: any) => {

  try {

    const user_id = Number(req.user.user_id)

    const file = req.file

    if (!file) {
      return res.status(400).json({
        message: "No file provided"
      })
    }
    
    // envolver en Promise
    const uploadToCloudinary = () => {

      return new Promise((resolve, reject) => {
        
        const stream = cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (error: any, uploaded: any) => {
            if (error) return reject(error)
            resolve(uploaded)
          }
        )

        stream.end(file.buffer)

      })
    }

    const uploaded: any = await uploadToCloudinary()

    const avatarUrl = uploaded.secure_url

    await updateAvatarService(user_id, avatarUrl)

    return res.json({ avatar: avatarUrl })

  } catch (error: any) {

    res.status(500).json({
      message: "Error updating user"
    })
    
  }
  
}



// Delete account
export const deleteUserByIdController = async (req: any, res: any) => {
  try {

    const user_id = Number(req.user.user_id)

    if (!user_id) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }


    const deleted: any = await deleteUserByIdService(user_id)

    if (!deleted) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    sendDeleteAccountService(req.user.email, req.user.name)
      .catch(err => console.error("Email error:", err))


    res.json({
      message: "Account deleted successfully"
    })
    
  } catch (error: any) {
    
    res.status(500).json({
      message: "Error deleting account"
    })

  }
}



// Create forgotten password code
export const requestPasswordResetController = async (req: any, res: any) => {

  const { email } = req.body
  
  try {

    const user = await getUserByEmailService(email)
    
    if (!user) return res.status(404).json({
      message: "User not found"
    })
    
    const code = await createResetCodeService(email)

    if (!code) return res.status(404).json({
      message: "Can't send email"
    })

    await sendEmailUtils(email, "Recovery code", htmlTemplateRecoveryPassword(user.name, code))

    res.status(200).json({
      message: "Code sent to email"
    })

  } catch (error: any) {
    
    res.status(500).json({
      message: "Error sending code"
    })
    
  }

}

// Verify code
export const verifyResetCodeController = async (req: any, res: any) => {

  const { email, code } = req.body

  try {
    
    const valid = await verifyResetCodeService(email, code)

    if (!valid) return res.status(400).json({
      message: "Invalid code or expired"
    })

    res.status(200).json({
      message: "Valid code"
    })

  } catch (error: any) {
    
    res.status(500).json({
      message: "Error checking code"
    })
    
  }

}

// Update password
export const updatePasswordController = async (req: any, res: any) => {
  
  const { email, code, password } = req.body

  try {
    
    const valid = await verifyResetCodeService(email, code)

    if (!valid) return res.status(400).json({
      message: "Invalid code or expired"
    })

    await updatePasswordService(email, password)

    res.status(200).json({
      message: "Password updated successfully"
    })

  } catch (error: any) {
    
    res.status(500).json({
      message: "Error ressetting password"
    })
    
  }

}
