import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

console.log("✅✅✅ FINAL TEST: Deployment is working.");

app.get('/', (req, res) => {
  res.send('Test server is online!');
});

app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
});