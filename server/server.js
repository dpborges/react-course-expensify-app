const path    = require('path')
const express = require('express');
const app     = express();
const publicPath = path.join(__dirname, '..', 'public');
const port    = process.env.PORT || 3000;

// Tell express where files live
app.use(express.static(publicPath));

// Line below is to avoid 404 errors when visiting routes set up in react's AppRouter
// The * will match all unmatched routes 
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Set port to listen to 
app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});




