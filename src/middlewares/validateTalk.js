const validateRate = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk.rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const validateParamRate = (req, res, next) => {
  const { rate } = req.query;

  if (typeof rate !== 'number') {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  if (talk.rate === 0) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });      
  }
  if (!talk.watchedAt) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }
  if (!isFormatDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

module.exports = {
  validateTalk,
  validateRate,
  validateParamRate,
};
