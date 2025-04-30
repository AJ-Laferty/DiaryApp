import React, { useState } from 'react';
import "../styles/NewEntryForm.css";

const NewEntryForm = ({ onSave }) => {
  const [newEntry, setNewEntry] = useState({
    name: '',
    date: '',
    content: '',
    weatherLocation: '',
    image: null,
  });

  // Handle changes in input fields
  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newEntry); // Pass the new entry to parent for saving
    setNewEntry({
      name: '',
      date: '',
      content: '',
      weatherLocation: '',
    }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="new-entry-form">
      <input
        type="text"
        name="name"
        placeholder="Title"
        value={newEntry.name}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      <input
        type="date"
        name="date"
        value={newEntry.date}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      <textarea
        name="content"
        placeholder="Diary entry content"
        value={newEntry.content}
        onChange={handleInputChange}
        required
        className="form-textarea"
      />
      <input
        type="text"
        name="weatherLocation"
        placeholder="Location for weather"
        value={newEntry.weatherLocation}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      <button type="submit" className="submit-button">Save Entry</button>
    </form>
  );
};

export default NewEntryForm;
