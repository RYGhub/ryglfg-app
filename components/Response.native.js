import React from "react"
import {StyleSheet, View} from 'react-native'
import TextC from "./TextC"
import Sub from "./Sub"


const EMOJIS = {
    "accepted": "🔵",
    "late": "🕒",
    "rejected": "❌",
    "not_available": "❗️",
}


export default function Response({style, data}) {
    if(data["choice"] === "unset") return null;

    return (
        <TextC style={[styles.view, style]}>
            {EMOJIS[data["choice"]]} <Sub id={data["partecipant_id"]}/>
        </TextC>
    )
}

const styles = StyleSheet.create({
    view: {}
})
