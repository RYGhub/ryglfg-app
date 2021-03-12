import React from "react"
import {StyleSheet, Text} from 'react-native'


export default function Sub({style, id}) {
    return (
        <Text style={[styles.text, style]}>
            👤 {id}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "monospace",
        color: "#21669A"
    }
})
