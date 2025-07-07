
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// Replace this with your bot token
const TELEGRAM_BOT_TOKEN = '7538825089:AAETh4Qp0VkANsv9YHvHNPZTm-eEGSFGlpA';

app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  const {
    chat_id,
    text,
    photo,
    parse_mode = 'Markdown'
  } = req.body;

  try {
    if (photo) {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        chat_id,
        caption: text,
        photo,
        parse_mode
      });
    } else {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id,
        text,
        parse_mode
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Telegram error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to send message to Telegram.' });
  }
});

app.get('/', (req, res) => {
  res.send('Bitafam Render Bot is alive ⚡');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Telegram Proxy running on port ${PORT}`);
});
