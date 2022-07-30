const pad = num => `${num < 10 ? '0' : ''}${num}`;

export function getDateStr(date=new Date()) {
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`
}