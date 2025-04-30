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
      className="grid grid-cols-5 gap-4 p-4 rounded-xl bg-[#fffef9] shadow-md mb-6 cursor-pointer transition-transform duration-200 font-['Patrick_Hand'] max-w-full hover:scale-[1.01]"
      onClick={() => !isEditing && setIsExpanded(!isExpanded)}
    >
      {!isExpanded ? (
        <div className="flex justify-between items-baseline gap-3 w-full col-span-5 overflow-hidden">
          <h2 className="text-2xl overflow-hidden whitespace-nowrap text-ellipsis flex-1 min-w-0 m-0">
            {entry.title}
          </h2>
          <p className="text-sm text-gray-600 whitespace-nowrap">
            {new Date(entry.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <div onClick={(e) => e.stopPropagation()} className="col-span-5">
          {isEditing ? (
            <>
              <input
                name="title"
                className="w-full mb-3 p-2.5 border border-gray-300 rounded-md font-bold text-base"
                value={formData.title}
                onChange={handleChange}
              />
              <textarea
                name="content"
                className="w-full mb-3 p-2.5 border border-gray-300 rounded-md font-inherit text-base"
                rows={4}
                value={formData.content}
                onChange={handleChange}
              />
              <textarea
                name="reflection"
                className="w-full mb-3 p-2.5 border border-gray-300 rounded-md font-inherit text-base italic"
                placeholder="Reflection"
                rows={2}
                value={formData.reflection}
                onChange={handleChange}
              />
              <input
                name="tags"
                className="w-full mb-3 p-2.5 border border-gray-300 rounded-md font-inherit text-base"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={handleChange}
              />
              <div className="flex flex-wrap gap-2.5 mt-4">
                <button
                  className="py-2 px-3.5 text-sm rounded-md border-none cursor-pointer transition-colors duration-200 bg-blue-500 text-white"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="py-2 px-3.5 text-sm rounded-md border-none cursor-pointer transition-colors duration-200 bg-gray-500 text-white"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-baseline gap-3 w-full col-span-5 overflow-hidden">
                <h2 className="text-2xl overflow-hidden whitespace-nowrap text-ellipsis flex-1 min-w-0 m-0">
                  {entry.title}
                </h2>
                <p className="text-sm text-gray-600 whitespace-nowrap">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-base text-gray-700 mb-3 col-span-1 break-words">
                {entry.content}
              </p>

              {entry.reflection && (
                <blockquote className="border-l-4 border-[#c4a7e7] pl-3 my-3 italic text-[#6a4f8f] col-span-1 break-words">
                  {entry.reflection}
                </blockquote>
              )}

              <div className="col-start-2 row-span-2">
                <WeatherWidget weather={entry.weather} />
              </div>

              {entry.tags.length > 0 && (
                <div className="my-3 col-span-1">
                  {entry.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs mr-1.5 mb-1.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-400 mt-2 col-start-2 row-start-2 text-right">
                Last updated: {new Date(entry.updatedAt).toLocaleString()}
              </div>

              <div className="flex flex-wrap gap-2.5 mt-4">
                <button
                  className="py-2 px-3.5 text-sm rounded-md border-none cursor-pointer transition-colors duration-200 bg-green-500 text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Update
                </button>
                <button
                  className="py-2 px-3.5 text-sm rounded-md border-none cursor-pointer transition-colors duration-200 bg-red-500 text-white"
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
          <p className="text-base py-2.5 text-gray-800">
            Are you sure you want to delete this entry?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default DiaryEntry;
