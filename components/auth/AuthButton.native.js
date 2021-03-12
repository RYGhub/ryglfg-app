import React, {useEffect, useContext} from "react"
import {Button, StyleSheet, View} from 'react-native'
import {makeRedirectUri, ResponseType, useAuthRequest, useAutoDiscovery} from "expo-auth-session"
import ContextAuth from "../../contexts/ContextAuth"
import jwt_decode from 'jwt-decode';


export default function AuthButton({}) {
    const [authData, setAuthData] = useContext(ContextAuth);

    const discovery = useAutoDiscovery("https://ryg.eu.auth0.com")

    const [request, response, promptAsync] = useAuthRequest({
            clientId: "DFxyF0VoTJBnzZoFl3CD9JUvk7CH6kmq",
            clientSecret: "S7gAZ_ex3VQrKbhnNKD9r6st53Volxvd-A3zyKBhWpe19uvrRiffsVdkG_XtNNVk",
            scopes: [
                "openid",
                "profile",
                "email",
                "read:lfg",
                "create:lfg",
                "edit:lfg",
                "answer:lfg",
                "start:lfg",
                "cancel:lfg"
            ],
            redirectUri: makeRedirectUri({
                native: "ryglfg://redirect"
            }),
            responseType: ResponseType.Token,
            extraParams: {
                audience: "https://lfg.ryg.one",
            },
        }, discovery
    )

    useEffect(() => {
        if(response === null) return
        if(response.type !== "success") return

        console.info(`[Auth] Successfully logged in!`)
        const authData = response["authentication"];
        authData["payload"] = jwt_decode(authData["accessToken"], {payload: true})

        setAuthData(authData)
    }, [response])

    if(discovery === null) {
        return (
            <Button title={"Discovering..."} disabled={true}/>
        )
    }

    if(request === null) {
        return (
            <Button title={"Building request..."} disabled={true}/>
        )
    }

    return (
        <Button disabled={!request} onPress={() => promptAsync()} title={"RYGlogin"}/>
    )
}

const styles = StyleSheet.create({
    view: {}
})
