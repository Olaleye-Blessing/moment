// username can only contain a-z0-9_
export const validateUserName = (username) =>
    /^(?=.{5,15}$)(?!.*[_]{2})[a-z][a-z0-9_]*[a-z0-9]$/.test(username);

// 5 to 15 chracters long -- (?=.{5,15}$)
// _ won't occur more than once in a row -- (?!.*[_]{2})
// must start with letter -- [a-z]

// https://stackoverflow.com/a/2846911/11431272

export const validateName = (name) => /^[a-z]*$/i.test(name);
