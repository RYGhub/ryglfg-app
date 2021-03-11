import React, {useContext} from "react"
import {StyleSheet, Text} from 'react-native'
import colorRegex from "../utils/colorRegex"
import ContextColor from "../contexts/ContextColor"


export default function TextC({style, children}) {
    const color = useContext(ContextColor)

    const colorStyle = StyleSheet.create({
        text: {
            color: color,
        }
    })

    return (
        <Text style={[styles.view, colorStyle.text, style]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {}
})
