export const uniqueArrayOfObject = (arrayObject, uniqueField) => {
    return arrayObject.reduce((unique, currentObject) => {
        if (
            !unique.some(
                (obj) => obj[uniqueField] === currentObject[uniqueField]
            )
        ) {
            unique.push(currentObject);
        }
        return unique;
    }, []);
};
