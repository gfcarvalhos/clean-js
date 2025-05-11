const nodemailer = require('nodemailer');
module.exports = function nodemailerService() {
  const enviarEmail = async function ({
    data_saida,
    data_retorno,
    nome_usuario,
    CPF,
    email,
    nome_livro,
  }) {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '49f53907d678f9',
        pass: '119bbfb583f1d8',
      },
    });

    const data_saida_BR = data_saida.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
    const data_retorno_BR = data_retorno.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });

    await transporter.sendMail({
      from: '"Biblioteca UNI" <contato@uni.com>',
      to: email,
      subject: 'Novo livro emprestado',
      text: `Olá ${nome_usuario} (${CPF}), \nVocê pegou o livro '${nome_livro}' emprestado dia ${data_saida_BR} e deverá devolver dia ${data_retorno_BR}. \nBoa Leitura!`,
    });
  };

  return { enviarEmail };
};
