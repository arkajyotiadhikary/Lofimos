import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "6%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    headerLogo: {
        alignItems: "center",
        flexDirection: "row",
    },
    // TODO move the image a bit left so that the face of the girl stays a the center
    logo: {
        width: 40,
        height: 40,
        marginEnd: 15,
        resizeMode: "contain",
        borderRadius: 100,
        objectFit: "cover",
    },
    rightSideHeader: {
        flexDirection: "row",
    },
    userProfileHolder: {
        marginLeft: 30,
        borderWidth: 1,
        borderRadius: 100,
    },
    userProfile: {},
});
