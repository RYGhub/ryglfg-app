import React from "react"
import {StyleSheet, View} from 'react-native'
import Box from "./Box"
import TextC from "./TextC"
import ContextColor from "../contexts/ContextColor"


export default function MenuAnnouncement({style, data}) {
    const autostartTime = new Date(data["autostart_time"])
    const todayTime = new Date()
    const partecipantCount = data["responses"].filter(r => (r["choice"] === "accepted")).length

    return (
        <ContextColor.Provider value={colors[data["state"]]}>
            <Box style={[styles.box, style]}>
                <View style={styles.view}>
                    <TextC style={styles.time}>
                        {
                            Math.abs(autostartTime - todayTime) < 86400000 ?
                                `${autostartTime.getHours().toString().padStart(2, "0")}:${autostartTime.getMinutes().toString().padStart(2, "0")}` :
                                `${autostartTime.getFullYear()}-${(autostartTime.getMonth()+1).toString().padStart(2, "0")}-${autostartTime.getDate().toString().padStart(2, "0")}`
                        }
                    </TextC>
                    <TextC style={styles.title}>
                        {data["title"]}
                    </TextC>
                    {partecipantCount > 0 ?
                        <TextC style={styles.partecipants}>
                            • {partecipantCount}
                        </TextC>
                    : null}
                </View>
            </Box>
        </ContextColor.Provider>
    )
}

const styles = StyleSheet.create({
    box: {},
    view: {
        flexDirection: "row",
    },
    time: {},
    title: {
        fontWeight: "bold",
        marginLeft: 8,
        marginRight: "auto",
    },
    partecipants: {
        marginLeft: 4,
    },
})

const colors = {
    "-1": "rgb(160,204,255)", // Not open yet
    "0": "rgb(255,255,125)", // Open right now
    "1": "rgb(125,255,125)", // Started
    "2": "rgb(255,125,125)", // Cancelled
}