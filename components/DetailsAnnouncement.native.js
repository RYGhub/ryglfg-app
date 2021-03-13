import React, {useContext, useEffect, useState} from "react"
import {StyleSheet, View, RefreshControl, ScrollView} from 'react-native'
import Box from "./Box"
import TextC from "./TextC"
import ContextColor from "../contexts/ContextColor"
import renderDate from "../utils/renderDate"
import ContextDetails from "../contexts/ContextDetails"
import ContextAuth from "../contexts/ContextAuth"
import {colors} from "../utils/stateInfo"


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

    let contents;

    if(error !== null) {
        return <TextC>⚠️ {error.toString()}</TextC>
    }

    if(isRefreshing || data === null) {
        return null;
    }

    const openingTime = new Date(data["opening_time"])
    const autostartTime = new Date(data["autostart_time"])

    let opening;
    if(data["state"] <= -1) {
        opening = (
            <TextC>Apertura: <TextC>{openingTime.toString()}</TextC></TextC>
        )
    }
    else {
        opening = null
    }

    let autostart;
    if(data["state"] <= 0) {
        autostart = (
            <TextC>Inizio: <TextC>{autostartTime.toString()}</TextC></TextC>
        )
    }
    else if(data["state"] === 1) {
        autostart = (
            <TextC>Iniziato</TextC>
        )
    }
    else if(data["state"] === 2) {
        autostart = (
            <TextC>Annullato</TextC>
        )
    }

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
                        {opening}
                        {autostart}
                    </View>
                </Box>
            </ScrollView>
        </ContextColor.Provider>
    )
}

const styles = StyleSheet.create({
    box: {},
    view: {
        flexDirection: "column",
    },
    time: {},
    title: {
        fontWeight: "bold",
        fontSize: 24,
        marginRight: "auto",
    },
})
