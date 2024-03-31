import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        height: "100%",
    },
    formTitleHolder: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    formTitle: {
        fontWeight: "bold",
        fontSize: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 30,
        marginTop: 10,
        resizeMode: "contain",
    },
    form: {
        padding: 10,
    },
    errBox: {
        marginTop: 15,
        padding: 5,
    },
    errBoxText: {
        color: "red",
    },
    inputHolder: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },
    signOpt: {
        margin: 5,
    },
    btnHolder: {
        width: "100%",
        alignItems: "center",
        marginVertical: 20,
    },
    btn: {
        backgroundColor: "black",
        borderRadius: 5,
    },
    btnText: {
        margin: 10,
        color: "white",
    },
});
