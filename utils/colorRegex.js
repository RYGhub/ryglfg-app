import {useContext} from "react"
import ContextColor from "../contexts/ContextColor"

const colorRegex = /^rgb[(](?<part>.+)[)]$/

export default colorRegex;

export function getPart(full) {
    return colorRegex.exec(useContext(ContextColor)).groups["part"]
}
