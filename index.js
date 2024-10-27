import session from 'express-session';
import exphbs from 'express-handlebars';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './server/dbConnect.js';
import productsRouter from './server/api/products.js';
import usersRouter from './server/api/users.js';
import indexRouter from './server/api/index.js';
import signupRouter from './server/api/signup.js';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT;
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main'})); 
app.set('view engine', '.hbs');
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "ajax.googleapis.com"],
        "img-src": ["'self'", "via.placeholder.com"]
      },
    },
  })
);

app.use('/', productsRouter);
app.use('/', usersRouter);
app.use('/', indexRouter);
app.use('/', signupRouter);

/**
 * Middleware function to handle 404 errors.
 * Renders a custom error page when a requested route is not found.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.use((req, res) => {
  res.status(404).render('handling', { title: 'Page Not Found', body: 'Error 404. Page not found.' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});