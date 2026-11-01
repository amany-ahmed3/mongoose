import {Router} from 'express';
import * as noteController from './note.controller.js';

 export const noteRouter = new Router();

noteRouter.post('/', noteController.createNoteController);

 noteRouter.patch('/all', noteController.updateAllTitlesController);

noteRouter.get('/paginate-sort', noteController.getPaginatedNotesController);

noteRouter.get('/note-by-content', noteController.getNoteByContentController);

noteRouter.get('/note-with-user', noteController.getNotesWithUserController);

noteRouter.get('/aggregate', noteController.getNotesAggregateController);

noteRouter.delete('/', noteController.deleteAllNotesController);

noteRouter.put('/replace/:noteId', noteController.replaceNoteController);

noteRouter.patch('/:noteId', noteController.updateNoteController);

noteRouter.delete('/:noteId', noteController.deleteNoteController);

noteRouter.get('/:id', noteController.getNoteByIdController);

