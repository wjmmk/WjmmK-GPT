require('dotenv').config();
const express =  require('express')
const OpenAI = require("openai")
const app = express()
app.use(express.static('public'))

const openai = new OpenAI({
    apiKey: process.env.APIKEY,
})

/* const openai = new OpenAIApi(config) */

app.post('/', async (req, res)=> {   
    console.log(req.route)
    try {
      const openFun=async()=>{
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": req.body.question}],
          });
          console.log(chatCompletion.choices[0].message.content);
       }
        
        openFun();
          
      res.status(200).json({message: resp.data.choices[0].message.content})
    } catch(e) {
        res.status(400).json({message: e.message})
    }
})

app.listen(5000, ()=> {
    console.log("Server is active")
}) 