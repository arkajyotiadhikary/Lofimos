import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    userDeails: {
        justifyContent: "center",
        alignItems: "center",
    },
    userProfilePic: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
    },
    listContainer: {
        marginBottom: 10,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listBtn: {
        marginBottom: 5,
    },
    logoutBtn: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "red",
    },
    logoutBtnText: {
        color: "white",
    },
});
