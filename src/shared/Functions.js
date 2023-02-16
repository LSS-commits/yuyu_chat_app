// check MIME type for img
const supportedFormat = ['image/png', 'image/jpeg'];
let isValidFormat = false;
const validateFileUpload = (file) => {

    // if type is empty
    if (file.type === "") {
        isValidFormat  = false;
        return isValidFormat;
    }

    if (file && file.type) {
        if (0 > supportedFormat.indexOf(file.type)) {
            isValidFormat  = false;
        } else {
            isValidFormat  = true;
        }
        return isValidFormat ;
    }
};

// TODO: create a validation function for files or remove file attachment 

export {
    supportedFormat,
    isValidFormat,
    validateFileUpload,
};
