const OpenAI = require("openai/index.js");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are MarketGo AI Assistant. Help customers with shopping, products, orders, shipping, returns, and general questions give answer in 1-2 line.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    res.status(200).json({
      success: true,
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Groq AI Error",
      error: error.message,
    });
  }
};

module.exports = {
  chatController,
};