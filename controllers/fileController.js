const { body, validationResult } = require('express-validator');

let files = {
    A: [],
    B: [],
    C: [],
    D: []
};

let isComplete = false;

const processInput = [
    body('number')
        .isInt({ min: 1, max: 25 })
        .withMessage('Number must be an integer between 1 and 25'),
    (req, res) => {
        if (isComplete) {
            return res.status(400).json({ error: 'Process complete. No more numbers can be entered.' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { number } = req.body;
        const multipliedNumber = number * 7;

        if (multipliedNumber > 140) {
            files.A.push(multipliedNumber);
        } else if (multipliedNumber > 100) {
            files.B.push(multipliedNumber);
        } else if (multipliedNumber > 60) {
            files.C.push(multipliedNumber);
        } else {
            files.D.push(multipliedNumber);
        }

        // Check if all files have at least one number
        if (files.A.length > 0 && files.B.length > 0 && files.C.length > 0 && files.D.length > 0) {
            isComplete = true;
        }

        res.status(200).json({ message: 'Number processed successfully.' });
    }
];

const getFiles = (req, res) => {
    res.status(200).json(files);
};

module.exports = {
    processInput,
    getFiles
};
