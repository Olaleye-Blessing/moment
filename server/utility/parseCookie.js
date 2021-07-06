export const parseCookie = (req, res, next) => {
    let cookies = {};
    let { cookie } = req.headers;

    if (cookie) {
        let arrayOfCookie = cookie.split("; ");
        arrayOfCookie.forEach((cook) => {
            let [name, value] = cook.split("=");
            cookies[name] = value;
        });
    }
    req.cookies = cookies;
    next();
};
