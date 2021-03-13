import React, {Fragment, useState} from 'react'
import { StyleSheet, StatusBar, Text, View, BackHandler } from 'react-native';
import MenuAnnouncement from "./components/MenuAnnouncement"
import AuthButton from "./components/auth/AuthButton"
import ContextAuth from "./contexts/ContextAuth"
import Sub from "./components/Sub"
import AnnouncementList from "./components/AnnouncementList"
import ContextDetails from "./contexts/ContextDetails"
import DetailsAnnouncement from "./components/DetailsAnnouncement"


export default function App() {
    const authDataState = useState(null);
    const [authData, setAuthData] = authDataState;
    const detailsState = useState(null);
    const [details, setDetails] = detailsState;

    StatusBar.setBarStyle("light-content", true)
    BackHandler.addEventListener("hardwareBackPress", event => {
        if(details !== null) {
            setDetails(null)
            return true;
        }
        return false;
    })

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
    else if(details === null) {
        contents = (
            <Fragment>
                <Text style={styles.logged_in}>
                    <Sub id={authData["payload"]["sub"]}/>
                </Text>
                <AnnouncementList/>
            </Fragment>
        )
    }
    else {
        contents = (
            <Fragment>
                <Text style={styles.logged_in}>
                    <Sub id={authData["payload"]["sub"]}/>
                </Text>
                <DetailsAnnouncement data={details}/>
            </Fragment>
        )
    }

    return (
        <Fragment>

            <StatusBar backgroundColor={"#0d193b"}/>

            <ContextAuth.Provider value={authDataState}>
            <ContextDetails.Provider value={detailsState}>

                <View style={styles.container}>
                    {contents}
                </View>

            </ContextDetails.Provider>
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
