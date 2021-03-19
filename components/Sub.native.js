import React from "react"
import {StyleSheet, Text} from 'react-native'
import {Avatar} from "react-native-elements"


export default function Sub({style, id}) {
    return (
        <Text style={[styles.text, style]}>
            {id}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "monospace",
        color: "#21669A"
    }
})
