import React, {useContext, useEffect, useState} from "react"
import {StyleSheet, View, RefreshControl, ScrollView, FlatList} from 'react-native'
import Box from "./Box"
import TextC from "./TextC"
import ContextColor from "../contexts/ContextColor"
import renderAutoDatetime, {renderDate, renderFullDate, renderTime} from "../utils/renderAutoDatetime"
import ContextDetails from "../contexts/ContextDetails"
import ContextAuth from "../contexts/ContextAuth"
import {colors} from "../utils/stateInfo"
import dayStrings from "../utils/dayStrings"
import Response from "./Response"


export default function DetailsAnnouncement({style}) {
    const [details,] = useContext(ContextDetails);
    const [authData,] = useContext(ContextAuth);
    const [isRefreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const refresh = async () => {
        console.debug("[DetailsAnnouncement] Starting refresh...")
        setRefreshing(true)
        setError(null)
        try {
            const req = await fetch(`https://lfg.ryg.one/lfg/${details}`, {
                method: "GET",
                cache: "no-cache",
                headers: {
                    "Authorization": `${authData["tokenType"]} ${authData["accessToken"]}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
            const data = await req.json()
            setData(data)
            console.debug(`[DetailsAnnouncement] Refresh successful: ${JSON.stringify(data)}`)
        }
        catch (e) {
            console.error(`[DetailsAnnouncement] Request failed: ${e}`)
            setError(e)
        }
        setRefreshing(false);
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        refresh()
    }, [])

    if(error !== null) {
        return <TextC>⚠️ {error.toString()}</TextC>
    }

    if(isRefreshing || data === null) {
        return null;
    }

    const openingTime = new Date(data["opening_time"])
    const autostartTime = new Date(data["autostart_time"])
    const partecipantCount = data["responses"].filter(r => (r["choice"] === "accepted")).length

    return (
        <ContextColor.Provider value={colors[data["state"]]}>
            <ScrollView
                style={styles.view}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refresh}
                        colors={["#9EC9FD"]}
                        progressBackgroundColor={"#1E2F53"}
                    />
                }
            >
                <Box style={[styles.box, style]}>
                    <View style={styles.view}>
                        <TextC style={styles.title}>
                            {data["title"]}
                        </TextC>
                        <View style={styles.moment}>
                            <View style={styles.date}>
                                <TextC style={styles.smol}>
                                    {dayStrings[autostartTime.getDay()]}
                                </TextC>
                                <TextC style={styles.larg}>
                                    {renderDate(autostartTime)}
                                </TextC>
                            </View>
                            <View style={styles.time}>
                                <TextC style={styles.smol}>
                                    alle
                                </TextC>
                                <TextC style={styles.larg}>
                                    {renderTime(autostartTime)}
                                </TextC>
                            </View>
                        </View>
                        {data["description"] ?
                            <TextC style={styles.description}>
                                {data["description"]}
                            </TextC>
                        : null}
                    </View>
                    {partecipantCount > 0 ?
                        <View style={styles.partecipants}>
                            <TextC style={styles.partecipantsHeader}>
                                Partecipanti
                            </TextC>
                            <FlatList
                                data={data["responses"]}
                                renderItem={
                                    ({item}) => <Response data={item} key={item["rid"]}/>
                                }
                            />
                        </View>
                    : null}
                </Box>
            </ScrollView>
        </ContextColor.Provider>
    )
}

const styles = StyleSheet.create({
    box: {},
    view: {},
    title: {
        fontWeight: "bold",
        fontSize: 32,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
    },
    moment: {
        flexDirection: "row",
        marginTop: 16,
    },
    smol: {
        textAlign: "center",
    },
    larg: {
        fontSize: 24,
        fontFamily: "monospace",
    },
    date: {
        marginLeft: "auto",
        marginRight: 16,
    },
    time: {
        marginLeft: 16,
        marginRight: "auto",
    },
    description: {
        textAlign: "justify",
        marginTop: 16,
    },
    partecipantsHeader: {
        fontSize: 20,
        marginTop: 12,
        marginBottom: 12,
        textAlign: "center",
    }
})
