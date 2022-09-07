const { Configuration, OpenAIApi } = require('openai');

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
   const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
   });
   const openai = new OpenAIApi(configuration);

   let prompt = `Summarize the text of this passage in thorough and extensive detail: ${req.body.name} `;

   const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
   });

   return res.status(200).json({ text: `${response.data.choices[0].text}` });
}
