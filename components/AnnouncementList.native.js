import React, {useContext, useEffect, useState} from "react"
import {StyleSheet, View, RefreshControl, ScrollView} from 'react-native'
import ContextAuth from "../contexts/ContextAuth"
import {Text} from "react-native-web"
import TextC from "./TextC"


export default function AnnouncementList({style}) {
    const [authData, _] = useContext(ContextAuth);
    const [isRefreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const refresh = async () => {
        console.debug("[AnnouncementList] Starting refresh...")
        setRefreshing(true)
        const request = new XMLHttpRequest()
        request.onreadystatechange = () => {
            console.log(request.readyState)
            console.log(request.response)
            console.log(request.responseText)
        }
        request.open("GET", "https://lfg.ryg.one/lfg")
        request.send()
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        refresh()
    }, [])

    let contents;

    if(error) {
        contents = <TextC>{error.toString()}</TextC>
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
