import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function validateFormData(formData) {
    const { user_name, user_branch, user_sec, user_rollno, user_phone, user_email } = formData;

    if (!user_name || !user_branch || !user_sec || !user_rollno || !user_phone || !user_email) {
      return 'All fields are required.';
    }

    if (user_name.length < 2 || user_name.length > 50) {
      return 'Name must be between 2 and 50 characters.';
    }

    if (user_branch.length < 2 || user_branch.length > 50) {
      return 'Branch must be between 2 and 50 characters.';
    }

    if (user_sec.length !== 1) {
      return 'Section must be a single character.';
    }

    if (!/^[A-Za-z0-9]+$/.test(user_rollno)) {
      return 'Roll number must contain only alphanumeric characters.';
    }

    if (!/^[0-9]+$/.test(user_phone)) {
      return 'Phone number must contain only digits.';
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user_email)) {
      return 'Email must be a valid email address.';
    }

    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      name,
      branch,
      section,
      rollNumber,
      phoneNumber,
      email,
    };

    const errorMessage = validateFormData(formData);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      alert(response.data.message);
    } catch (err) {
      alert('An error occurred while processing your request.');
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <label htmlFor="branch">Branch:</label>
        <input type="text" id="branch" name="branch" value={branch} onChange={(event) => setBranch(event.target.value)} />
      </div>
      <div>
        <label htmlFor="section">Section:</label>
        <input type="text" id="section" name="section" value={section} onChange={(event) => setSection(event.target.value)} />
      </div>
      <div>
        <label htmlFor="rollNumber">Roll Number:</label>
        <input type="text" id="rollNumber" name="rollNumber" value={rollNumber} onChange={(event) => setRollNumber(event.target.value)} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
       
        <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default RegistrationForm;
