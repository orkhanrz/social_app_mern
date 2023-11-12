export const months = [
    {value: 1, text: "Jan"},
    {value: 2, text: "Feb"},
    {value: 3, text: "Mar"},
    {value: 4, text: "Apr"},
    {value: 5, text: "May"},
    {value: 6, text: "Jun"},
    {value: 7, text: "Jul"},
    {value: 8, text: "Aug"},
    {value: 9, text: "Sep"},
    {value: 10, text: "Oct"},
    {value: 11, text: "Nov"},
    {value: 12, text: "Dec"},
];



export const days = (month) => {
    let daysLength = 31;
    const arr = [];

    if (month === 2){
        daysLength = 28;
    } else if (month !== 2 && month % 2 === 0){
        daysLength = 30;
    } else {
        daysLength = 31;
    }

    for (let i = 1; i <= daysLength; i++){
        arr.push(i);
    };

    return arr;
}

export const years = () => {
    const currentYear = new Date().getFullYear();
    const arr = [];

    for (let i = 1905; i <= currentYear; i++){
        arr.push(i);
    };

    return arr;
}