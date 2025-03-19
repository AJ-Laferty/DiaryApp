import DiaryEntry from "../models/DiaryEntry.js";
//import { fetchWeather } from "./weatherController.js";

export const createEntry = async (req, res) => {
  try {
    const { title, content, reflection, tags, location, weather } = req.body;
    if (!title || !content || !location) {
        return res.status(400).json({ message: "Title, content, and location are required" });
    }
    console.log("Creating entry");
    const newEntry = DiaryEntry({
      //user: req.user.id,
      title,
      content,
      reflection,
      tags,
      location,
      weather,
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const { search, tag, location } = req.query;
    console.log("Getting entries");
    let filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    if (tag) {
      filter.tags = tag;
    }
    if (location) {
      filter.location = location;
    }
    const entries = await DiaryEntry.find(filter).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Unable to fetch diary entries" });
  }
};

export const getEntryById = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);
    console.log(`Getting entry by ID: ${req.params.id}`);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    console.log(`Updating entry by ID: ${req.params.id}`);
    const updatedEntry = await DiaryEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    console.log(`Deleting entry by ID: ${req.params.id}`);
    const deletedEntry = await DiaryEntry.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
