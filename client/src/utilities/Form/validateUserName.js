let regex = {
    "startsWithLetter": /^([a-z])/i,
    "underscoreOnce": /(?!.*[_]{2})/,
    "endWithNumOrLetter": /[a-z0-9]$/,
    "all": /^(?=.{5,15}$)(?!.*[_]{2})[a-z][a-z0-9_]*[a-z0-9]$/,
};

// username can only contain a-z0-9_
export const validateUserName = (username) =>
    /^(?=.{5,15}$)(?!.*[_]{2})[a-z][a-z0-9_]*[a-z0-9]$/.test(username);

// 5 to 15 chracters long -- (?=.{5,15}$)
// _ won't occur more than once in a row -- (?!.*[_]{2})
// must start with letter -- [a-z]

// https://stackoverflow.com/a/2846911/11431272
