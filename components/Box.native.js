import React, {useContext} from "react"
import { StyleSheet, View } from 'react-native'
import colorRegex, {getPart} from "../utils/colorRegex"
import ContextColor from "../contexts/ContextColor"


export default function Box({style, children}) {
    const color = getPart(useContext(ContextColor))

    const colorStyle = StyleSheet.create({
        view: {
            backgroundColor: `rgba(${color}, 0.02)`,
            borderColor: `rgba(${color}, 0.1)`,
        }
    })

    return (
        <View style={[styles.view, colorStyle.view, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        padding: 8,
        margin: 4,
        borderRadius: 4,
        borderWidth: 2,
    }
});

