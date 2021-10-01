const humanDate = (date) => {
    date = new Date(date);

    let dateString = date.toDateString();

    return dateString;
};

export default humanDate;
