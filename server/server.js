import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
// import { Configuration,OpenAIApi } from 'openai';
import OpenAI from "openai";

dotenv.config();


// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// console.log(process.env.OPENAI_API_KEY);
// openai.apiKey = process.env.OPEN_API_KEY;


const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});
// const openai = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!',
  });
  console.log(res);
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;


    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: `${prompt}`,
      temperature: 0.8,
      max_tokens: 64,
      top_p: 1,
      
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: `${prompt}`,
    //   temperature: 0.7,
    //   max_tokens: 64,
    //   top_p: 1.0,
    //   frequency_penalty: 0.3,
    //   presence_penalty: 0.0,

      // model: 'text-davinci-003',
      // prompt: `${prompt}`,
      // temperature: 0, // Higher values means the model will take more risks.
      // max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      // top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      // frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      // presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });
    
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});


app.listen(5000, () =>
  console.log('AI server started on http://localhost:5000'),

);
