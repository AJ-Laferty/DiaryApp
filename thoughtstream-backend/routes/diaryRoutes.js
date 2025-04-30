import express from "express";
import {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
} from "../controllers/diaryController.js"
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateJWT, getAllEntries);
router.get("/:id", authenticateJWT, getEntryById);
router.post("/", authenticateJWT, createEntry);
router.put("/:id", authenticateJWT, updateEntry);
router.delete("/:id", authenticateJWT, deleteEntry);

export default router;