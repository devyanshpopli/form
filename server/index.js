const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a new pool to connect to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});
//validating form data
function validateFormData(formData) {
    
    // if (!user_name || !user_branch || !user_sec || !user_rollno || !user_phone || !user_email) {
    //   return { isValid: false, errorMessage: 'All fields are required.' };
    // }
  
    // if (user_name.length < 2 || user_name.length > 50) {
    //   return { isValid: false, errorMessage: 'Name must be between 2 and 50 characters.' };
    // }
  
    // if (user_branch.length < 2 || user_branch.length > 50) {
    //   return { isValid: false, errorMessage: 'Branch must be between 2 and 50 characters.' };
    // }
  
    // if (user_sec.length !== 1) {
    //   return { isValid: false, errorMessage: 'Section must be a single character.' };
    // }
  
    // if (!/^[A-Za-z0-9]+$/.test(user_rollno)) {
    //   return { isValid: false, errorMessage: 'Roll number must contain only alphanumeric characters.' };
    // }
  
    // if (!/^[0-9]+$/.test(user_phone)) {
    //   return { isValid: false, errorMessage: 'Phone number must contain only digits.' };
    // }
  
    // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user_email)) {
    //   return { isValid: false, errorMessage: 'Email must be a valid email address.' };
    // }
  
    // return { isValid: true };
  }
  

// Route for registering a new user
app.post('/register', async (req, res) => {
    const { user_name, user_branch, user_sec, user_rollno, user_phone, user_email } = formData;
    const formData = req.body;
  
    // // Validating the form data
    // const validation = validateFormData(formData);
  
    // if (!validation.isValid) {
    //   return res.status(400).json({ error: validation.errorMessage });
    // }
  
    try {
      // Inserting the form data into the database
      await pool.query(
        'INSERT INTO registrations (name, branch, section, roll_number, phone_number, email) VALUES ($1, $2, $3, $4, $5, $6)',
        [formData.user_name, formData.user_branch, formData.user_sec, formData.user_roll, formData.user_phone, formData.user_email]
      );
  
      // Return a success message
      return res.status(200).json({ message: 'Registration successful.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
