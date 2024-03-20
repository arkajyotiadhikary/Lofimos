import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "6%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 15,
    },
    // TODO move the image a bit left so that the face of the girl stays a the center
    userProfilePic: {
        width: 40,
        height: 40,
        marginEnd: 15,
        resizeMode: "contain",
        borderRadius: 5,
        objectFit: "cover",
    },
    greetings: {},
    username: {
        fontWeight: "bold",
        fontSize: 20,
    },
});
