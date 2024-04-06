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
    // change password
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        borderRadius: 5,
        backgroundColor: "white",
        alignSelf: "center",
        padding: 20,
        height: 320,
        width: 350,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 10,
    },

    modalInputTitle: {
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
    },
    modalInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 5,
        marginBottom: 10,
    },
    modalInput: {},

    modalBtn: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "red",
    },
    modalBtnText: {
        color: "white",
    },
});
