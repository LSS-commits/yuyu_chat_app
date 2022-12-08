// check MIME type for avatar img in registration form
const supportedType = ['image/png', 'image/jpeg'];
const validateFileUpload = (file, bool) => {

    if (file.type === ".url") {
        console.log("url not accepted");
    }

    if (file && file.type) {
        if (0 > supportedType.indexOf(file.type)) {
            console.log("wrong format", file.type);
            // return wrong value
            bool = false;
        } else {
            console.log("format ok");
            // return ok value
            bool = true;
        }
        return bool;
    }
};


export {
    supportedType,
    validateFileUpload
};
