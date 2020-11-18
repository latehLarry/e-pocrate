var sendgrid =  require("@sendgrid/mail");

sendgrid.setApiKey(process.env.sendgridKey)

exports.mailService = {
  async sendDoctorCreation({email}) {
    const msg = {
      to: email,
      from: {
        email: 'medium420@gmail.com',
        name: 'Support E-pocrate',
      },
      subject: 'Contact epocrate créé avec succès.',
      text: `BIENVENUE SUR E-POCRATE
      Votre compte a été créé. Nous traitons votre demande et nous vous revenons après confirmation de votre compte
      Vos accès à la plateforme:
      username: ${email}`,
      html: `<h1>BIENVENUE SUR E-POCRATE</h1> <br>
      Votre compte a été créé. Nous traitons votre demande et nous vous revenons après confirmation de votre compte<br>
      Vos accès à la plateforme: <br><b>username</b>: ${email}<br>`,
    }
    
    return sendgrid
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      });
  }
}
