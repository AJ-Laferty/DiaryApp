import React from "react";
import DiaryEntryCard from "./DiaryEntryCard";
import "../styles/DiaryList.css";

const DiaryList = ({ entries, onUpdateEntry, onDeleteEntry }) => {
  return (
    <div className="diary-list-container">
      <div className="notebook-binding" />
      {entries.map((entry, index) => (
        <div
          key={entry.id || `${entry.name}-${entry.date}-${index}`}
          className="diary-entry-wrapper"
        >
          <DiaryEntryCard
            entry={entry}
            onDeleteEntry={onDeleteEntry}
            onUpdateEntry={onUpdateEntry}
          />
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
