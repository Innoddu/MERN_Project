import express from "express";
import * as NoteController from "../controllers/notes";

const router = express.Router()

// Get notes 
router.get("/", NoteController.getNotes);

// Get note by noteId
router.get("/:noteId", NoteController.getNote);

// Create note
router.post("/", NoteController.createNote);

// Update note by noteId
router.patch("/:noteId", NoteController.updateNote);

// Delete note by noteID
router.delete("/:noteId", NoteController.deleteNote);
export default router;

