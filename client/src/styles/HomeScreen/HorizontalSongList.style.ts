import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    scrollView: {
        flexDirection: "row",
        marginTop: 30,
    },
    contentContainer: {
        flexDirection: "row",
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 200,
    },
    itemImage: {
        width: 160,
        height: 140,
    },
    itemDetails: {
        width: "100%",
        padding: 10,
    },
    itemTitle: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "left",
    },
    itemArtist: {
        fontSize: 14,
        textAlign: "left",
    },
});
