import React, { FC, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "../styles/Auth";

const Auth: FC = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <View style={styles.formTitleHolder}>
                <Text style={styles.formTitle}>
                    {isSignIn ? "Sign In" : "Sign Up"}
                </Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputHolder}>
                    <TextInput placeholder="Username" />
                </View>
                {!isSignIn && (
                    <View style={styles.inputHolder}>
                        <TextInput placeholder="Email" />
                    </View>
                )}
                <View style={styles.inputHolder}>
                    <TextInput placeholder="Password" />
                </View>
                <View style={styles.signOpt}>
                    <Text onPress={() => setIsSignIn(!isSignIn)}>
                        {isSignIn
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Sign In"}
                    </Text>
                </View>
                <View style={styles.btnHolder}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Auth;
