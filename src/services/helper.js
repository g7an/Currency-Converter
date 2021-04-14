export const getCurrentDate = (offset) => {
    let newDate = new Date()
    let date = newDate.getDate() - offset;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
}