import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "6%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    headerLogo: {
        // justifyontent: "center",
        alignItems: "center",
        flexDirection: "row",
        // backgroundColor: "black",
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
    userProfile: {
        marginLeft: 15,
    },
});
