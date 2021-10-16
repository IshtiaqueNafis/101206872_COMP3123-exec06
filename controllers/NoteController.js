const ErrorResponse = require('../utlis/ErrorResponse');
const asyncHandler = require('../middleWare/async');
const Notes = require('../models/NotesModel');

//region getAllNotes --> get all the notes
exports.getAllNotes = asyncHandler(async (req, res, next) => {
    const notes = await Notes.find();

    if (!notes) {
        return next(new ErrorResponse(`No Notes found`, 400));
    }
    res.status(200).json({success: true, data: notes});

});
//endregion

//region get a single note
exports.getNoteById = asyncHandler(async (req, res, next) => {
    const note = await Notes.findById(req.params.id);
    note.dateUpdated = Date.now();
    if (!note) {
        return next(new ErrorResponse(`Notes not found with the id ${req.params.id}`, 400))

    }
    res.status(200).json({success: true, data: note});
})


//endregion


//region createNote --> create notes
exports.createNote = asyncHandler(async (req, res, next) => {
    const note = await Notes.create(req.body);
    res.status(200).json({
        success: true,
        data: note
    })
})


//endregion

//region updateNote --> updates note
exports.updateNote = asyncHandler(async (req, res, next) => {
    const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true

    })
    if (!note) {
        return next(new ErrorResponse(`Notes not found with the id ${req.params.id}`, 400))

    }
    res.status(200).json({success: true, data: note});

});

//endregion


//region deleteNot --> delete note
exports.deleteNote = asyncHandler(async (req, res, next) => {
    const note = await Notes.findByIdAndDelete(req.params.id);
    if (!note) {
        return next(new ErrorResponse(`Notes not found with the id ${req.params.id}`, 400))
    }
    res.status(200).json({success: true, data: {}});
})


//endregion