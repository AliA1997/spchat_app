export function getTime() {
    const d = new Date(); // for now
    const day = d.getDay();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hours = d.getHours(); // => 9
    const minutes = d.getMinutes(); // =>  30
    const seconds = d.getSeconds(); // => 51
    return `Date: ${day}/${month}/${year}, Time: ${hours} : ${minutes} : ${seconds}`;
}