import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    list: {
        // backgroundColor: "black",
    },
    listItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    listItemContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    listItemText: {
        marginLeft: 10,
    },
});
