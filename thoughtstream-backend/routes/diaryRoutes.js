import express from "express";
import {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
} from "../controllers/diaryController.js"
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getAllEntries);
router.get("/:id", ensureAuthenticated, getEntryById);
router.post("/", ensureAuthenticated, createEntry);
router.put("/:id", ensureAuthenticated, updateEntry);
router.delete("/:id", ensureAuthenticated, deleteEntry);

export default router;