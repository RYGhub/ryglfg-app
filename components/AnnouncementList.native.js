import React, {useContext, useEffect, useState} from "react"
import {StyleSheet, View, RefreshControl, ScrollView} from 'react-native'
import ContextAuth from "../contexts/ContextAuth"
import {Text} from "react-native-web"
import TextC from "./TextC"
import MenuAnnouncement from "./MenuAnnouncement"


export default function AnnouncementList({style}) {
    const [authData, _] = useContext(ContextAuth);
    const [isRefreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const refresh = async () => {
        console.debug("[AnnouncementList] Starting refresh...")
        setRefreshing(true)
        setError(null)
        console.log(`${authData["tokenType"]} ${authData["accessToken"]}`)
        try {
            const req = await fetch("https://lfg.ryg.one/lfg", {
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
            console.debug(`[AnnouncementList] Refresh successful: ${JSON.stringify(data)}`)
        }
        catch (e) {
            console.error(`[AnnouncementList] Request failed: ${e}`)
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
        contents = <TextC>⚠️ {error.toString()}</TextC>
    }
    if(data !== null) {
        if(data.length == 0) {
            contents = <TextC>Non c'è nulla qui...</TextC>
        }
        else {
            contents = data.map(lfg => <MenuAnnouncement key={lfg["aid"]} data={lfg}/>)
        }
    }

    return (
        <ScrollView style={[styles.view, style]}>
            <RefreshControl refreshing={isRefreshing} onRefresh={() => refresh}/>
            {contents}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {}
})
