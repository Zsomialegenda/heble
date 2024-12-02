
// 404 Error handler
exports.get404 = (req, res) => {
    res.status(404).json({
        message: 'Resource not found.',
        üzenet: 'Az erőforrás nem található.',
    });
};

// 500 Error handler
exports.get500 = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: 'An unexpected error occurred.',
        üzenet: 'Váratlan hiba történt.',
    });
};
