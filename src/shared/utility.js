export const updateObject = (oldObject , updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = ( value , rules ) => {
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !== '' && isValid ;
    }
    if(rules.range){
        isValid = parseInt(value) >=0 && parseInt(value)<=5 && isValid; 
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid ;
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid ;
    }

    return isValid
}

export const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};