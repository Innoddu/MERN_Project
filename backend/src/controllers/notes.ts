import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {        
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }

};
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }
        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note note found");
        }
        res.status(200).json(note);
    } catch (error) {
        next(error)
    };
}

interface CreateNoteBody {
    title?: string,
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            // 400: bad rquest
            throw createHttpError(400, "Note must have title")
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });
        // HTTP Successfully
        res.status(201).json(newNote);
    } catch (error) {
        next(error)
    };
};

interface UpdateNoteParams {
    noteId: string,
}


interface UpdateNoteBody {
    title?: string,
    text?: string,
}


export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }
        if (!newTitle) {
            // 400: bad rquest
            throw createHttpError(400, "Note must have title")
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note note found");
        }
        
        note.title = newTitle;
        note.text = newText;
        
        const updateNote = await note.save();

        res.status(200).json(updateNote);;
    } catch (error) {
        next(error);
    }
};


export const deleteNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }
        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note note found");
        }
        await note.deleteOne();

        res.status(204).json({ message: "Note deleted successfully" });
    } catch (error) {
        next(error);
    }
};
