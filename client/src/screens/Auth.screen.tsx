import React, { FC, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "../styles/Auth.style";
import { type User } from "../../types";

import { signUp, signIn, validateUserInput } from "../services/authService";

const Auth: FC = () => {
    // a variable to check is it sign in or sign up form
    const [isSignIn, setIsSignIn] = useState(false);
    // a object to store user data from the input field
    const [formData, setFormData] = useState<Partial<User>>({
        username: "",
        email: "",
        password: "",
    });
    // error message
    const [errorState, setErrorState] = useState("");

    // empty the input when isSignin changes
    useEffect(() => {
        setFormData({
            username: "",
            email: "",
            password: "",
        });
        setErrorState("");
    }, [isSignIn]);

    // method to handle change in the input field . Assing updated values in the variable
    const handleChange = (name: keyof User, value: string): void => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // method to handle submit . Check wheather you are submittin sign in form of sign up form
    const handleSubmit = async (): Promise<void> => {
        const validation = validateUserInput(formData, isSignIn);
        if (validation.isValid) {
            if (isSignIn) signIn(formData.email, formData.password);
            else {
                const response = await signUp(
                    formData.username,
                    formData.email,
                    formData.password
                );
                // if (!response?.hasError) setIsSignIn(true);
            }
        } else {
            setErrorState(validation.message);
        }
    };

    // render form
    return (
        <View style={styles.container}>
            {/* form */}
            <View style={styles.formTitleHolder}>
                <Text style={styles.formTitle}>
                    {isSignIn ? "Sign In" : "Sign Up"}
                </Text>
                {/* error message box */}
                <View>
                    {errorState ? (
                        <View style={styles.errBox}>
                            <Text style={styles.errBoxText}>{errorState}</Text>
                        </View>
                    ) : (
                        ""
                    )}
                </View>
            </View>
            {/* submit button */}
            <View style={styles.form}>
                <View style={styles.inputHolder}>
                    <TextInput
                        placeholder="Username"
                        value={formData.username}
                        onChangeText={(e) => handleChange("username", e)}
                    />
                </View>
                {!isSignIn && (
                    <View style={styles.inputHolder}>
                        <TextInput
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(e) => handleChange("email", e)}
                        />
                    </View>
                )}
                <View style={styles.inputHolder}>
                    <TextInput
                        placeholder="Password"
                        value={formData.password}
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
