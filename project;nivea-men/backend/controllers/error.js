// 404 Error Handler
exports.get404 = (req, res, next) => {
    const error = new Error('Not found');
    error.statusCode = 404;
    next(error); // Pass error to the global error handler
};

// Global Error Handler (500 and other errors)
exports.get500 = (error, req, res, next) => {
    const data = error.data; // Optional extra data for the error
    res.status(error.statusCode || 500).json({
        error: {
            message: error.message, // Corrected key
            data: data || null
        }
    });
};
