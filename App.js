import React, {Fragment, useState} from 'react'
import { StyleSheet, ScrollView, StatusBar, Text, Button } from 'react-native';
import MenuAnnouncement from "./components/MenuAnnouncement"
import AuthButton from "./components/auth/AuthButton"
import ContextAuth from "./contexts/ContextAuth"
import Sub from "./components/Sub"
import AnnouncementList from "./components/AnnouncementList"


export default function App() {
    const authDataState = useState(null);
    const [authData, setAuthData] = authDataState;

    StatusBar.setBarStyle("light-content", true)

    let contents;
    if(!authData) {
        contents = (
            <Fragment>
                <Text style={styles.title}>
                    Login richiesto
                </Text>
                <AuthButton/>
            </Fragment>
        )
    }
    else {
        console.log(authData)

        contents = (
            <Fragment>
                <Text style={styles.logged_in}>
                    <Sub id={authData["payload"]["sub"]}/>
                </Text>
                <AnnouncementList/>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <StatusBar backgroundColor={"#0d193b"}/>
            <ContextAuth.Provider value={authDataState}>
                <ScrollView style={styles.container}>
                    {contents}
                </ScrollView>
            </ContextAuth.Provider>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#0d193b',
    },
    title: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 8,
    },
    logged_in: {
        color: "#fff",
        textAlign: "center",
        marginBottom: 8,
    }
});
