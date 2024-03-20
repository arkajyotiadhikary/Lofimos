import { StyleSheet } from "react-native";

export default StyleSheet.create({
    item: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    trackDetails: {
        flexDirection: "row",
        alignItems: "center",
    },
    coverArt: {
        height: 45,
        width: 45,
        marginRight: 10,
    },
    details: {
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    title: {
        color: "black",
        fontWeight: "bold",
    },
    btn: {},
});
