const validateAge = (req, res, next) => {
  console.log('Middleware validateAge chamado');
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

module.exports = validateAge;