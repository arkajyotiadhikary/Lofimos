import { StyleSheet } from "react-native";

/**
 * Stylesheet for search bar component.
 *
 * Defines styles for:
 * - search bar container
 * - search input holder
 * - search input
 */
export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
    },

    inputHolder: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: "gainsboro",
        borderRadius: 20,
    },
    input: {
        flex: 1,
        margin: 5,
        height: 40,
    },
});
