export default function renderDate(time) {
    const today = new Date()
    const delta = Math.abs(time - today)
    if(delta < 43200000) {
        const hours = time.getHours().toString().padStart(2, "0")
        const minutes = time.getMinutes().toString().padStart(2, "0")
        return `${hours}:${minutes}`
    }
    else if(delta < 15768000000) {
        const month = time.getMonth().toString().padStart(2, "0")
        const day = time.getDate().toString().padStart(2, "0")
        return `${day}/${month}`
    }
    else {
        const year = time.getFullYear()
        return `Y${year}`
    }
}
