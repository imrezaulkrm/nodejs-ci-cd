const express = require('express');
const app = express();
const port = 3000;

// New feature route
app.get('/new', (req, res) => {
    res.send('This is the new app feature!');
});

// Original route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
