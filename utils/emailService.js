const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendPasswordResetEmail = async (email, resetToken) => {
    const resetUrl = `${process.env.URL_FRONT}/reset-password/${resetToken}`;

    await transporter.sendMail({
        from: '"RegaloXTi"',
        to: email,
        subject: 'Restablece tu contraseña de RegaloXTi',
        html: `
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>El enlace expirará en 1 hora.</p>
    `,
    });
};

module.exports = { sendPasswordResetEmail };