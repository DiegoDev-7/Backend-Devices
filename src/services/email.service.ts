/* Utils */
import { sendEmailUtils } from "../utils/email.utils.js"
import { htmlTemplateWelcomeNexia, htmlTemplateDeleteNexia } from "../utils/email.templates.js"



// Send email when user is register
export async function sendWelcomeEmailService(
  email: string,
  name: string
) {

  const mailOptions = {
    from: "Nexia <no-reply@nexia.com>",
    to: email,
    subject: "¡Bienvenido a Nexia!",
    html: htmlTemplateWelcomeNexia(name)
  }

  await sendEmailUtils(
    mailOptions.to,
    mailOptions.subject,
    mailOptions.html
  )
  
}


// Send email when user is register
export async function sendDeleteAccountService(
  email: string,
  name: string
) {

  const mailOptions = {
    from: "Nexia <no-reply@nexia.com>",
    to: email,
    subject: "¡Cuenta eliminada exitosamente!",
    html: htmlTemplateDeleteNexia(name)
  }

  await sendEmailUtils(
    mailOptions.to,
    mailOptions.subject,
    mailOptions.html
  )

}