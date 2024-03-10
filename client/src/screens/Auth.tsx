import React, { FC, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "../styles/Auth";
import { type User } from "../../types";

import { signUp, signIn } from "../services/authService";

const Auth: FC = () => {
    // a variable to check is it sign in or sign up form
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    // a object to store user data from the input field
    const [formData, setFormData] = useState<Partial<User>>({
        username: "",
        email: "",
        password: "",
    });

    // method to handle change in the input field . Assing updated values in the variable
    const handleChange = (name: keyof User, value: string): void => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(formData);
    };

    // method to handle submit . Check wheather you are submittin sign in form of sign up form
    const handleSubmit = (): void => {
        if (isSignIn) signIn(formData.email, formData.password);
        else signUp(formData.username, formData.email, formData.password);
    };

    // render form
    return (
        <View style={styles.container}>
            <View style={styles.formTitleHolder}>
                <Text style={styles.formTitle}>
                    {isSignIn ? "Sign In" : "Sign Up"}
                </Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputHolder}>
                    <TextInput
                        placeholder="Username"
                        onChangeText={(e) => handleChange("username", e)}
                    />
                </View>
                {!isSignIn && (
                    <View style={styles.inputHolder}>
                        <TextInput
                            placeholder="Email"
                            onChangeText={(e) => handleChange("email", e)}
                        />
                    </View>
                )}
                <View style={styles.inputHolder}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={(e) => handleChange("password", e)}
                    />
                </View>
                <View style={styles.signOpt}>
                    <Text onPress={() => setIsSignIn(!isSignIn)}>
                        {isSignIn
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Sign In"}
                    </Text>
                </View>
                <View style={styles.btnHolder}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Auth;
