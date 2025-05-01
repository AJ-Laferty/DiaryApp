import React, { useState, useEffect } from 'react';
import "../styles/NewEntryForm.css";

const NewEntryForm = ({ onSave }) => {
  const [newEntry, setNewEntry] = useState({
    title: '',
    date: '',
    content: '',
    weatherLocation: '',
    image: '',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');
  const [imageValid, setImageValid] = useState(true);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') setImageValid(true);

    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleTagsChange = (e) => {
    const raw = e.target.value;
    setTagInput(raw);

    const tagArray = raw
      .split(',')
      .map(tag)
      .filter(tag => tag.length > 0);

    setNewEntry({ ...newEntry, tags: tagArray });
  };

  useEffect(() => {
    if (!newEntry.image) return;
    const img = new Image();
    img.onload = () => setImageValid(true);
    img.onerror = () => setImageValid(false);
    img.src = newEntry.image;
  }, [newEntry.image]);

  // Validate inputs
  const validateEntry = () => {
    const newErrors = {};
    const { title, date, content, weatherLocation, image } = newEntry;

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!date) newErrors.date = "Date is required.";
    if (!content.trim()) newErrors.content = "Content is required.";
    if (!weatherLocation.trim()) newErrors.weatherLocation = "Weather location is required.";
    if (!weatherLocation.trim()) {
      newErrors.weatherLocation = "Weather location is required.";
    } else if (!/^[A-Za-z\s]+,\s?[A-Za-z]{2}$/.test(weatherLocation.trim())) {
      newErrors.weatherLocation = "Location must be in the format 'City, CC'.";
    }

    // Basic check for a safe image URL
    if (image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(image)) {
      newErrors.image = "Image must be a valid image URL (jpg, png, etc).";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEntry();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSave(newEntry);

    setNewEntry({
      title: '',
      date: '',
      content: '',
      weatherLocation: '',
      image: '',
      tags: [],
    });
    setTagInput('');
    setImageValid(true);
  };

  return (
    <form onSubmit={handleSubmit} className="new-entry-form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newEntry.title}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}

      <input
        type="date"
        name="date"
        value={newEntry.date}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}

      <textarea
        name="content"
        placeholder="Diary entry content"
        value={newEntry.content}
        onChange={handleInputChange}
        required
        className="form-textarea"
      />
      {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}

      <input
        type="text"
        name="weatherLocation"
        placeholder="City, Country Code"
        value={newEntry.weatherLocation}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      {errors.weatherLocation && <p className="text-red-500 text-xs mt-1">{errors.weatherLocation}</p>}

      <input
        type="text"
        name="image"
        placeholder="Image URL (optional)"
        value={newEntry.image}
        onChange={handleInputChange}
        className="form-input"
      />
      {(!imageValid || errors.image) && newEntry.image && (
        <p className="text-red-500 text-xs mt-1">{errors.image || "⚠️ This doesn't seem to be a valid image URL."}</p>
      )}
      {imageValid && newEntry.image && (
        <div className="image-preview">
          <img
            src={newEntry.image}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }}
          />
        </div>
      )}

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={tagInput}
        onChange={handleTagsChange}
        className="form-input"
      />

      <button type="submit" className="submit-button">Save Entry</button>
    </form>
  );
};

export default NewEntryForm;
