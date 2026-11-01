import * as noteService from './note.service.js';

export async function createNoteController(req, res) {
    try {
        const note = await noteService.createNote({
            title: req.body.title,
            content: req.body.content,
            userId: req.query.id
        });

        res.status(201).json({
            message: 'Note created successfully',
            data: note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function updateNoteController(req, res) {
    try {
        const note = await noteService.updateNote(
            req.params.noteId,
            req.query.id,
            req.body
        );

        res.status(200).json({
            message: 'Note updated successfully',
            data: note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function replaceNoteController(req, res) {
    try {
        const note = await noteService.replaceNote(
            req.params.noteId,
            req.query.id,
            req.body
        );

        res.status(200).json({
            message: 'Note replaced successfully',
            data: note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function updateAllTitlesController(req, res) {
    try {
        const result = await noteService.updateAllTitles(
            req.query.id,
            req.body.title
        );

        res.status(200).json({
            message: 'Titles updated successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function deleteNoteController(req, res) {
    try {
        const note = await noteService.deleteNote(
            req.params.noteId,
            req.query.id
        );

        res.status(200).json({
            message: 'Note deleted successfully',
            data: note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function getPaginatedNotesController(req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (
            page < 1 ||
            limit < 1 ||
            !Number.isInteger(page) ||
            !Number.isInteger(limit)
        ) {
            return res.status(400).json({
                message: 'Page and limit must be positive integers'
            });
        }

        const notes = await noteService.getPaginatedNotes(
            req.query.id,
            page,
            limit
        );

        res.status(200).json({
            page,
            limit,
            data: notes
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function getNoteByIdController(req, res) {
    try {
        const note = await noteService.getNoteById(
            req.params.id,
            req.query.id
        );

        res.status(200).json({
            data: note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function getNoteByContentController(req, res) {
    try {
        const note = await noteService.getNoteByContent(
            req.query.id,
            req.query.content
        );

        res.status(200).json({
            data: note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function getNotesWithUserController(req, res) {
    try {
        const notes = await noteService.getNotesWithUserInfo(req.query.id);

        res.status(200).json({
            data: notes
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function getNotesAggregateController(req, res) {
    try {
        const notes = await noteService.getNotesAggregate(
            req.query.id,
            req.query.title
        );

        res.status(200).json({
            data: notes
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function deleteAllNotesController(req, res) {
    try {
        const result = await noteService.deleteAllNotes(req.query.id);

        res.status(200).json({
            message: 'All notes deleted successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}