import {Note} from '../../common/db/note.model.js';

export async function createNote(data) {
    const note = await Note.create(data);
    return note;
}

export async function updateNote(noteId, userId, data) {
    const note = await Note.findOneAndUpdate(
        { _id: noteId, userId },
        data,
        { new: true, runValidators: true }
    );

    return note;
}

export async function replaceNote(noteId, userId, data) {
    const note = await Note.findOneAndReplace(
        { _id: noteId, userId },
        data,
        { new: true, runValidators: true }
    );

    return note;
}

export async function updateAllTitles(userId, title) {
    const result = await Note.updateMany(
        { userId },
        { $set: { title } },
        { runValidators: true }
    );

    return result;
}

export async function deleteNote(noteId, userId) {
    const note = await Note.findOneAndDelete({
        _id: noteId,
        userId
    });

    return note;
}

export async function getPaginatedNotes(userId, page, limit) {
    const notes = await Note.find({ userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return notes;
}

export async function findNoteById(noteId, userId) {
    const note = await Note.findOne({
        _id: noteId,
        userId
    });

    return note;
}

export async function findNoteByContent(userId, content) {
    const note = await Note.findOne({
        userId,
        content
    });

    return note;
}

export async function getNotesWithUser(userId) {
    const notes = await Note.find({ userId })
        .select('title userId createdAt')
        .populate('userId', 'email');

    return notes;
}

export async function aggregateNotes(userId, title) {
    const match = { userId };

    if (title) {
        match.title = {
            $regex: title,
            $options: 'i'
        };
    }

    const notes = await Note.aggregate([
        {
            $match: match
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                title: 1,
                content: 1,
                createdAt: 1,
                name: '$user.name',
                email: '$user.email'
            }
        }
    ]);

    return notes;
}

export async function deleteAllNotes(userId) {
    const result = await Note.deleteMany({ userId });
    return result;
}