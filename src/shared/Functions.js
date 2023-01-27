// check MIME type for avatar img in registration form
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

export {
    supportedFormat,
    isValidFormat,
    validateFileUpload,
};
