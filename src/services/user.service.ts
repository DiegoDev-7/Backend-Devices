import bcrypt from "bcrypt"

/* Models */
import cloudinary from "../config/cloudinary.js"
import { createResetCodeModel, deleteUserByIdModel, getAvatarModel, getUserByIdModel, resetPasswordModel, updateAvatarModel, updateUserModel, verifyCodeModel } from "../model/user.model.js"
import { getPublicIdFromUrlUtils } from "../utils/upload.utils.js"



// Get a user by id
export const getUsersByIdService = async (
  user_id: number
) => {
  try {
    
    let user = await getUserByIdModel(user_id)

    if (!user) return null

    return user
    
  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }
    
  }
}



// Delete user
export const deleteUserByIdService = async (
  user_id: number 
) => {
  try {

    return await deleteUserByIdModel(user_id)
    
  } catch (error: any) {

    if (error.code !== "23505") {
      throw error
    }
    
  }
}



// Update user
export const updateUserSerive = async (
  user_id: number,
  name: string,
  lastName: string,
  password: string | null,
  avatar: string
) => {

  return updateUserModel(
    user_id,
    name,
    lastName,
    password,
    avatar
  )

}



// Update avatar
export const updateAvatarService = async (
  user_id: number,
  avatar: string
) => {

  const currentAvatar = await getAvatarModel(user_id)

  if (currentAvatar) {

    const public_id = getPublicIdFromUrlUtils(currentAvatar)

    await cloudinary.uploader.destroy(public_id)

  }

  await updateAvatarModel(user_id, avatar)

}



// Create forgotten password code
export const createResetCodeService = async (
  email: string
) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const codeExpiration = new Date(Date.now() + 10 * 60 * 1000)

  await createResetCodeModel(code, codeExpiration, email)

  return code
}

// Verify code
export const verifyResetCodeService = async (
  email: string, 
  code: string
) => {

  try {
    
    const user = await verifyCodeModel(email)

    if (!user) return false

    if (user.reset_code !== code) return false

    if (new Date() > new Date(user.reset_code_expiration)) return false

    return true

  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }

  }

}

// Update password
export const updatePasswordService = async (
  email: string,
  password: string
) => {

  try {

    const hashedPassword = await bcrypt.hash(password, 10)
    
    await resetPasswordModel(hashedPassword, email)

  } catch (error: any) {
    
    if (error.code !== "23505") {
      throw error
    }

  }

}