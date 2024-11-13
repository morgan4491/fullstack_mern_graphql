export function errorHandler(error) {
    const errors = [];
    if (error.code === 11000) {
        errors.push('That email address is already in use');
    }
    else {
        // This is a 'for-in' loop that loops over an object
        for (const prop in error.errors) {
            errors.push(error.errors[prop].message);
        }
    }
    return {
        errors: errors
    };
}
