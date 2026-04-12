import nodemailer from "nodemailer"



// Config to send emails
export const sendEmailUtils = async (to: string, subject: string, htmlContent: string) => {
  
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: htmlContent
    })
    
  } catch (error: any) {
    
    throw new Error("Error sending the message")

  }

}