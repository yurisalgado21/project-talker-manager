const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

const path = require('path');

const talkerPath = path.resolve(__dirname, './talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readFileTalker = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pode ser lido: ${error}`);
  }
};

app.get('/talker', async (_req, res) => {
  try {
    const talker = await readFileTalker();
    if (talker.length === 0) {
      res.status(200).json([]);
    }
    res.status(200).json(talker);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server error' });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const talker = await readFileTalker();
    const person = talker.find(({ id }) => id === Number(req.params.id));
    if (!person) {
      res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if ([email, password].includes(undefined)) {
    return res.status(401).json({ message: 'Campos ausentes' });
  }
  const token = generateToken();
  return res.status(200).json({ token });
});
