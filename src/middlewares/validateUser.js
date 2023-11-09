const validEmail = (req, res, next) => {
  const { email } = req.body;

  const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!email || email === undefined) {
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' }); 
  }
  if (!isValidEmail.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' }); 
  }
  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};

module.exports = {
  validEmail,
  validPassword,
};