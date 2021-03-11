import React from 'react';
import { StyleSheet, ScrollView, StatusBar, Text } from 'react-native';
import MenuAnnouncement from "./components/MenuAnnouncement"


export default function App() {
    StatusBar.setBarStyle("light-content", true)

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={"#0d193b"}/>
            <Text style={styles.title}>
                RYGlfg
            </Text>
            <MenuAnnouncement data={
                {
                    "title": "Dotino veloce",
                    "description": "Un dotino veloce, così, tanto per",
                    "opening_time": "2021-03-10T19:00:00.000Z",
                    "autostart_time": "2021-03-10T20:00:00.000Z",
                    "aid": 0,
                    "creator_id": "Steffo",
                    "creation_time": "2021-03-10T18:23:35.847Z",
                    "editing_time": "2021-03-10T18:23:35.847Z",
                    "closer_id": "string",
                    "closure_time": "2021-03-10T18:23:35.847Z",
                    "state": -1,
                    "responses": []
                }
            }/>
            <MenuAnnouncement data={
                {
                    "title": "Dotino lentissimo",
                    "description": "Un dota al rallentatore, per cambiare un po'",
                    "opening_time": "2021-03-10T19:00:00.000Z",
                    "autostart_time": "2021-03-10T20:00:00.000Z",
                    "aid": 0,
                    "creator_id": "Steffo",
                    "creation_time": "2021-03-10T18:23:35.847Z",
                    "editing_time": "2021-03-10T18:23:35.847Z",
                    "closer_id": "string",
                    "closure_time": "2021-03-10T18:23:35.847Z",
                    "state": 0,
                    "responses": [
                        {
                            "choice": "accepted",
                            "aid": 0,
                            "partecipant_id": "asdf",
                            "posting_time": "2021-03-10T18:23:35.847Z",
                            "editing_time": "2021-03-10T18:23:35.847Z"
                        },
                        {
                            "choice": "accepted",
                            "aid": 1,
                            "partecipant_id": "awefa",
                            "posting_time": "2021-03-10T18:23:35.847Z",
                            "editing_time": "2021-03-10T18:23:35.847Z"
                        },
                        {
                            "choice": "rejected",
                            "aid": 2,
                            "partecipant_id": "asdfef",
                            "posting_time": "2021-03-10T18:23:35.847Z",
                            "editing_time": "2021-03-10T18:23:35.847Z"
                        },
                    ]
                }
            }/>
            <MenuAnnouncement data={
                {
                    "title": "Dotone grosso",
                    "description": "Ogre Magi ha castato Bloodlust su una torre",
                    "opening_time": "2021-03-10T19:00:00.000Z",
                    "autostart_time": "2021-03-10T20:00:00.000Z",
                    "aid": 0,
                    "creator_id": "YourMother",
                    "creation_time": "2021-03-10T18:23:35.847Z",
                    "editing_time": "2021-03-10T18:23:35.847Z",
                    "closer_id": "string",
                    "closure_time": "2021-03-10T18:23:35.847Z",
                    "state": 1,
                    "responses": [
                        {
                            "choice": "accepted",
                            "aid": 0,
                            "partecipant_id": "string",
                            "posting_time": "2021-03-10T18:23:35.847Z",
                            "editing_time": "2021-03-10T18:23:35.847Z"
                        }
                    ]
                }
            }/>
            <MenuAnnouncement data={
                {
                    "title": "Dotino noioso",
                    "description": "Ops, non volevo fare un dotino così",
                    "opening_time": "2021-03-10T19:00:00.000Z",
                    "autostart_time": "2021-03-10T20:00:00.000Z",
                    "aid": 0,
                    "creator_id": "Steffo",
                    "creation_time": "2021-03-10T18:23:35.847Z",
                    "editing_time": "2021-03-10T18:23:35.847Z",
                    "closer_id": "string",
                    "closure_time": "2021-03-10T18:23:35.847Z",
                    "state": 2,
                    "responses": [
                        {
                            "choice": "rejected",
                            "aid": 0,
                            "partecipant_id": "string",
                            "posting_time": "2021-03-10T18:23:35.847Z",
                            "editing_time": "2021-03-10T18:23:35.847Z"
                        }
                    ]
                }
            }/>
        </ScrollView>
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
    }
});
