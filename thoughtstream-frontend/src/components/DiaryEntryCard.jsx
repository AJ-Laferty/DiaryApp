import React, { useState } from "react";
import WeatherWidget from "./WeatherWidget";
import Modal from "./Modal";
import "../styles/DiaryEntryCard.css";

const DiaryEntry = ({ entry, onUpdateEntry, onDeleteEntry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [formData, setFormData] = useState({
    title: entry.title,
    content: entry.content,
    reflection: entry.reflection || "",
    tags: entry.tags.join(", "),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedEntry = {
      ...entry,
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    onUpdateEntry(updatedEntry);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteEntry(entry._id);
    setShowConfirmDelete(false);
  };

  return (
    <div
      className="diary-entry"
      onClick={() => !isEditing && setIsExpanded(!isExpanded)}
    >
      {!isExpanded ? (
        <div className="diary-header">
        <h2 className="diary-title">{entry.title}</h2>
        <p className="diary-date">
          {new Date(entry.createdAt).toLocaleDateString()}
        </p>
      </div>
      ) : (
        <div onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <>
              <input
                name="title"
                className="diary-input-title"
                value={formData.title}
                onChange={handleChange}
              />
              <textarea
                name="content"
                className="diary-textarea"
                rows={4}
                value={formData.content}
                onChange={handleChange}
              />
              <textarea
                name="reflection"
                className="diary-textarea diary-reflection"
                placeholder="Reflection"
                rows={2}
                value={formData.reflection}
                onChange={handleChange}
              />
              <input
                name="tags"
                className="diary-input-tags"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={handleChange}
              />
              <div className="diary-actions">
                <button className="diary-save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="diary-cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="diary-header">
        <h2 className="diary-title">{entry.title}</h2>
        <p className="diary-date">
          {new Date(entry.createdAt).toLocaleDateString()}
        </p>
      </div>

              <p className="diary-content">{entry.content}</p>

              {entry.reflection && (
                <blockquote className="diary-reflection-blockquote">
                  {entry.reflection}
                </blockquote>
              )}

              <div className="weather-widget-container">
                <WeatherWidget weather={entry.weather} />
              </div>

              {entry.tags.length > 0 && (
                <div className="diary-tags">
                  {entry.tags.map((tag, idx) => (
                    <span key={idx} className="diary-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="diary-last-updated">
                Last updated: {new Date(entry.updatedAt).toLocaleString()}
              </div>

              <div className="diary-actions">
                <button
                  className="diary-update-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Update
                </button>
                <button
                  className="diary-delete-btn"
                  onClick={() => setShowConfirmDelete(true)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showConfirmDelete && (
        <Modal
          title="Confirm Delete"
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={handleDelete}
        >
          <p className="modal-text">
            Are you sure you want to delete this entry?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default DiaryEntry;
