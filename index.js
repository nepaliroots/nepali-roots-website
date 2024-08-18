const express = require('express')
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/:url_path', (req, res) => {
    // Extract the filename from the URL
    const filename = req.params.url_path;

    // Construct the full file path (assuming files are in a "public" directory)
    const filePath = path.join(__dirname, 'public', filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // If the file doesn't exist, render the "not found" page
        return res.render('pages/notfound', { title: 'Page Not Found', filename });
      }
      return res.render('pages/' + filename);
    });

  }).get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
