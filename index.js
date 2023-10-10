const express = require('express');
const { OpenAI } = require("openai")
const bodyParser = require("body-parser");
const cors= require('cors');
const dotenv = require('dotenv')
dotenv.config();

const openai = new OpenAI(({
    apiKey: process.env.API;
}))
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: req.body.question }],
        model: 'gpt-3.5-turbo',
      });
      console.log(chatCompletion.choices[0].message.content)
      res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.listen(port,
    () => console.log(`Server is running on http://localhost:${port}`)
);