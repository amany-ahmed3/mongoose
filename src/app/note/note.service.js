import * as noteRepo from './note.repository.js';

export async function createNote(data) {
    const note = await noteRepo.createNote(data);
    return note;
}

export async function updateNote(noteId, userId, data) {
    const note = await noteRepo.updateNote(noteId, userId, data);

    if (!note) {
        throw new Error('Note not found or you are not the owner');
    }

    return note;
}

export async function replaceNote(noteId, userId, data) {
    const noteData = {
        title: data.title,
        content: data.content,
        userId
    };

    const note = await noteRepo.replaceNote(noteId, userId, noteData);

    if (!note) {
        throw new Error('Note not found or you are not the owner');
    }

    return note;
}

export async function updateAllTitles(userId, title) {
    if (!title) {
        throw new Error('Title is required');
    }

    const result = await noteRepo.updateAllTitles(userId, title);
    return result;
}

export async function deleteNote(noteId, userId) {
    const note = await noteRepo.deleteNote(noteId, userId);

    if (!note) {
        throw new Error('Note not found or you are not the owner');
    }

    return note;
}

export async function getPaginatedNotes(userId, page, limit) {
    const notes = await noteRepo.getPaginatedNotes(userId, page, limit);
    return notes;
}

export async function getNoteById(noteId, userId) {
    const note = await noteRepo.findNoteById(noteId, userId);

    if (!note) {
        throw new Error('Note not found or you are not the owner');
    }

    return note;
}

export async function getNoteByContent(userId, content) {
    const note = await noteRepo.findNoteByContent(userId, content);

    if (!note) {
        throw new Error('Note not found');
    }

    return note;
}

export async function getNotesWithUserInfo(userId) {
    const notes = await noteRepo.getNotesWithUser(userId);
    return notes;
}

export async function getNotesAggregate(userId, title) {
    const notes = await noteRepo.aggregateNotes(userId, title);
    return notes;
}

export async function deleteAllNotes(userId) {
    const result = await noteRepo.deleteAllNotes(userId);
    return result;
}