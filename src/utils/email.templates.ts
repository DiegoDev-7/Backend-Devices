// Template for recovery password
export const htmlTemplateRecoveryPassword = (
  name: string, 
  code: string
) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f4f4f9; text-align: center;">
    <img src="https://res.cloudinary.com/dwwhyovjy/image/upload/v1773882251/NexiaWhite_q42o9x.png" alt="Logo" style="width: 50px; height: 50px; margin-bottom: 20px;" />
    <h2 style="color: #333;">Hola ${name}</h2>
    <p style="color: #555;">Recibimos una solicitud para reestablecer tu contraseña.</p>
    <p style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #111;">${code}</p>
    <p style="color: #555;">Ingresa este código en la app para restablecer tu contraseña. <br> El código expira en 10 minutos.</p>
    <a href=${process.env.FRONTEND_PROD, "/reset-password"} style="display:inline-block; margin-top:20px; padding: 10px 20px; background-color: #4f46e5; color: #fff; border-radius: 5px; text-decoration: none;">Ir a la app</a>
  </div>
`



// Template para soporte
export const htmlTemplateSupport = (
  name: string,
  email: string,
  message: string
) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f4f4f9; text-align: center;">
    
    <img src="https://res.cloudinary.com/dwwhyovjy/image/upload/v1773882251/NexiaWhite_q42o9x.png" alt="Logo" style="width: 50px; height: 50px; margin-bottom: 20px;" />

    <h2 style="color: #333;">Nuevo mensaje de soporte</h2>

    <p style="color: #555;">Has recibido una nueva solicitud desde la aplicación.</p>

    <div style="background:#fff; padding:15px; border-radius:6px; margin-top:20px; text-align:left;">
      
      <p style="color: #333; margin: 5px 0;">
        <strong>Nombre:</strong> ${name}
      </p>

      <p style="color: #333; margin: 5px 0;">
        <strong>Correo:</strong> ${email}
      </p>

    </div>

    <div style="background:#fff; padding:15px; border-radius:6px; margin-top:15px; text-align:left;">
      
      <p style="color: #333; margin-bottom:10px;">
        <strong>Problema:</strong>
      </p>

      <p style="color: #555; line-height:1.5;">
        ${message}
      </p>

    </div>

    <a href="mailto:${email}" 
       style="display:inline-block; margin-top:20px; padding: 10px 20px; background-color: #4f46e5; color: #fff; border-radius: 5px; text-decoration: none;">
       Responder al usuario
    </a>

  </div>
`



// Template for register new user in nexia
export const htmlTemplateWelcomeNexia = (
  name: string
) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #262626; padding: 20px; text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dwwhyovjy/image/upload/v1773882251/NexiaWhite_q42o9x.png" alt="Nexia logo" style="width: 50px; height: 50px;">
    </div>
    

    <!-- Body -->
    <div style="padding: 30px;">
      <h2 style="color: #333333; font-size: 22px; margin-top: 0;">¡Hola ${name}!</h2>

      <p style="color: #555555; font-size: 16px; line-height: 1.5;">
        Gracias por unirte a <strong>Nexia</strong>. Nos complace darte la bienvenida a nuestra plataforma.
      </p>

      <p style="color: #555555; font-size: 16px; line-height: 1.5;">
        Ya puedes comenzar a explorar tus beneficios y aprovechar todas las funcionalidades que tenemos para ti.
      </p>

      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 25px;">
        <a href=${process.env.FRONTEND_PROD}
          style="background-color: #262626; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 4px; display: inline-block;">
          Ir a Nexia
        </a>
      </div>

      <p style="color: #999999; font-size: 14px; margin-top: 30px;">
        Este correo se envía únicamente cuándo te registras.
      </p>
    </div>


    <!-- Footer -->
    <div style="background-color: #f5f5f5; padding: 15px; text-align: center;">
      <p style="color: #777777; font-size: 12px; margin: 0;">
        Nexia · Todos los derechos reservados
      </p>
    </div>

  </div>
`



// Template for delete user in nexia
export const htmlTemplateDeleteNexia = (
  name: string
) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #262626; padding: 20px; text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dwwhyovjy/image/upload/v1773882251/NexiaWhite_q42o9x.png" alt="Nexia logo" style="width: 50px; height: 50px;">
    </div>
    

    <!-- Body -->
    <div style="padding: 30px;">
      <h2 style="color: #333333; font-size: 22px; margin-top: 0;">Hola ${name},</h2>

      <p style="color: #555555; font-size: 16px; line-height: 1.5;">
        Lamentamos que hayas decidido abandonar <strong>Nexia</strong>.
      </p>

      <p style="color: #555555; font-size: 16px; line-height: 1.5;">
        Te confirmamos que tu cuenta ha sido eliminada correctamente de nuestra plataforma. 
        Todos los datos asociados han sido procesados según nuestras políticas.
      </p>

      <p style="color: #555555; font-size: 16px; line-height: 1.5;">
        Agradecemos el tiempo que hiciste parte de Nexia. Si en algún momento decides regresar, 
        estaremos disponibles para darte nuevamente la bienvenida.
      </p>

      <p style="color: #999999; font-size: 14px; margin-top: 30px;">
        Este es un mensaje informativo para confirmar la eliminación de tu cuenta.
      </p>
    </div>


    <!-- Footer -->
    <div style="background-color: #f5f5f5; padding: 15px; text-align: center;">
      <p style="color: #777777; font-size: 12px; margin: 0;">
        Nexia · Todos los derechos reservados
      </p>
    </div>

  </div>
`