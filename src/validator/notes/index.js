const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validateResult = NotePayloadSchema.validate(payload);
    // console.log(validateResult);
    if (validateResult.error) {
      // console.log(validateResult.error.message);
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = NotesValidator;
