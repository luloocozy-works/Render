const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/telegram-webhook', async (req, res) => {
  try {
    // 將 Telegram 傳來的資料轉送到 Hugging Face 的 n8n webhook
    await axios.post('https://cozyluloo-n8n-free.hf.space/webhook/telegram', req.body);
    res.status(200).send('Forwarded to n8n');
  } catch (error) {
    console.error('轉送失敗:', error.message);
    res.status(500).send('Error forwarding');
  }
});

app.get('/', (req, res) => {
  res.send('Webhook Relay is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
