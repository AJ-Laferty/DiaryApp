import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

import DiaryList from "../components/DiaryList";
import NewEntryForm from "../components/NewEntryForm";
import Header from "../components/Header";

import "../styles/Dashboard.css";

const DashboardPage = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchEntries();
    }
  }, [isAuthenticated]);

  const fetchEntries = async () => {
    try {
      const response = await api.get("api/diary");
      const sortedEntries = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setEntries(sortedEntries);
    } catch (error) {
      console.error("Failed to load entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (newEntry) => {
    try {
      const payload = {
        title: newEntry.name,
        content: newEntry.content,
        reflection: "",
        tags: [],
        location: newEntry.weatherLocation,
        image: newEntry.image,
      };
      const response = await api.post("api/diary", payload);
      setEntries((prev) =>
        [response.data, ...prev].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      fetchEntries();
    } catch (error) {
      console.error("Failed to add entry:", error);
    }
  };

  const handleUpdateEntry = async (updatedEntry) => {
    const id = updatedEntry.id || updatedEntry._id;
    if (!id) {
      console.error("Updated entry missing ID:", updatedEntry);
      return;
    }
    console.log(id);
    try {
      const response = await api.put(
        `api/diary/${id}`,
        updatedEntry
      );
      setEntries((prev) =>
        prev
          .map((entry) =>
            entry.id === updatedEntry.id ? response.data : entry
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      fetchEntries();
    } catch (error) {
      console.error("Failed to update entry:", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await api.delete(`api/diary/${id}`);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      fetchEntries();
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Header user={user} onLogout={logout} />

      <div className="dashboard-container">
        <NewEntryForm onSave={handleAddEntry} />

        <div className="entries-section">
          <h2 className="entries-title">Your Diary Entries</h2>
          <div className="entries-container">
            <DiaryList
              entries={entries}
              onUpdateEntry={handleUpdateEntry}
              onDeleteEntry={handleDeleteEntry}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
