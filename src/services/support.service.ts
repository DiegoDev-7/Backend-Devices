/* Utils */
import { sendEmailUtils } from "../utils/email.utils.js"

/* Templates */
import { htmlTemplateSupport } from "../utils/email.templates.js"



// Send email to the owner's email address
export const sendSupportService = async (
  name: string,
  email: string,
  message: string
) => {
  try {

    const html = htmlTemplateSupport(name, email, message)
  
    await sendEmailUtils(
      process.env.SUPPORT_EMAIL as string,
      "Nuevo mensaje de soporte",
      html
    )
    
  } catch (error: any) {

    throw new Error("Email send failed")
    
  }
}