const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to log URL paths for debugging (optional)
app.use((req, res, next) => {
  console.log('Requested URL:', req.originalUrl);
  next();
});

// Route for blog pages
app.get('/blogs/:url_path', (req, res) => {
  const filename = req.params.url_path;
  console.log('Blog URL path:', filename);

  // Render the blog page or a 404 if it does not exist
  return res.render(`blogs/${filename}`);
});

// Route for conference pages
app.get('/conferences/:url_path', (req, res) => {
  const filename = req.params.url_path;
  console.log('Conference URL path:', filename);

  // Render the blog page or a 404 if it does not exist
  return res.render(`conferences/${filename}`);
});

// Route for main pages
app.get('/:url_path', (req, res) => {
  const filename = req.params.url_path;
  console.log('Pages URL path:', filename);
  // Render the main page or a 404 if it does not exist
  return res.render(`pages/${filename}`);
});

// Home route
app.get('/', (req, res) => res.render('pages/index'));

// Fallback route for 404 Not Found
app.use((req, res) => {
  res.status(404).render('404'); // Render a generic 404 page for unmatched routes
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
