const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const validateTalkerId = async (req, res, next) => {
  const { id } = req.params;
  const data = await fs.readFile(talkerPath);
  const parseData = JSON.parse(data);
  const idExixts = parseData.find((person) => person.id === id);
  if (!idExixts) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = validateTalkerId;