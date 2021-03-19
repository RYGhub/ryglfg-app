import React, {useContext} from "react"
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import Box from "./Box"
import TextC from "./TextC"
import ContextColor from "../contexts/ContextColor"
import renderAutoDatetime from "../utils/renderAutoDatetime"
import ContextDetails from "../contexts/ContextDetails"
import {colors} from "../utils/stateInfo"


export default function MenuAnnouncement({style, data}) {
    const autostartTime = new Date(data["autostart_time"])
    const partecipantCount = data["responses"].filter(r => (r["choice"] === "accepted")).length

    const [, setDetails] = useContext(ContextDetails);

    return (
        <ContextColor.Provider value={colors[data["state"]]}>
            <TouchableOpacity underlayColor={"white"} onPress={() => setDetails(data["aid"])}>
                <Box style={[styles.box, style]}>
                    <View style={styles.view}>
                        <TextC style={styles.time}>
                            {renderAutoDatetime(autostartTime)}
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
            </TouchableOpacity>
        </ContextColor.Provider>
    )
}

const styles = StyleSheet.create({
    box: {},
    view: {
        flexDirection: "row",
    },
    time: {
        fontFamily: "monospace",
    },
    title: {
        fontWeight: "bold",
        marginLeft: 8,
        marginRight: "auto",
    },
    partecipants: {
        marginLeft: 4,
    },
})
