export default function renderAutoDatetime(time) {
    const today = new Date()
    const delta = Math.abs(time - today)
    if(delta < 43200000) {
        return renderTime(time)
    }
    else if(delta < 15768000000) {
        return renderDate(time)
    }
    else {
        return renderYear(time)
    }
}


export function renderYear(time) {
    const year = time.getFullYear()
    return `Y${year}`
}


export function renderDate(time) {
    const month = time.getMonth().toString().padStart(2, "0")
    const day = time.getDate().toString().padStart(2, "0")
    return `${day}/${month}`
}

export function renderFullDate(time) {
    const year = time.getFullYear()
    const month = time.getMonth().toString().padStart(2, "0")
    const day = time.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
}

export function renderTime(time) {
    const hours = time.getHours().toString().padStart(2, "0")
    const minutes = time.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
}