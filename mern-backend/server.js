const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.post('/validate-email', (req, res) => {
    const { email } = req.body;
    if (email && email.endsWith('@iitdh.ac.in')) {
        res.status(200).json({ message: 'Email is valid' });
    } else {
        res.status(400).json({ message: 'Invalid email domain' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});