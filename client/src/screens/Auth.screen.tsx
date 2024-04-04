import React, { FC, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/Auth.style";
import logo from "../assests/logo/wepik-export-20240324130518XYcX.png";

import { RootStackNavigationProp, type User } from "../../types";

import { signUp, signIn, validateUserInput } from "../services/authService";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
    setCurrentUserAuth,
    setCurrentUserData,
} from "../features/user/userSlice";
import { saveCachedResult } from "../utils/cachedResults";

const Auth: FC = () => {
    const dispatch = useDispatch();

    // a variable to check is it sign in or sign up form
    const [isSignIn, setIsSignIn] = useState(false);
    // a object to store user data from the input field
    const [formData, setFormData] = useState<Partial<User>>({
        userID: 0,
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
        console.log("form data:", formData);
        const validation = validateUserInput(formData, isSignIn);
        if (!validation.isValid) {
            setErrorState(validation.message);
            return;
        }

        try {
            let response;
            if (isSignIn) {
                response = await signIn(formData.email, formData.password);
                if (!response?.hasError && "data" in response!) {
                    await AsyncStorage.setItem("token", response?.data?.token!);
                    dispatch(
                        setCurrentUserAuth({
                            isAuthenticated: true,
                        }),
                        setCurrentUserData({
                            userID: response?.data?.userID!,
                            username: response?.data?.username!,
                            email: response?.data?.email!,
                            role: response?.data?.role!,
                        })
                    );
                    await saveCachedResult("userData", {
                        userID: response?.data?.userID!,
                        username: response?.data?.username!,
                        email: response?.data?.email!,
                        role: response?.data?.role!,
                    });
                }
            } else {
                response = await signUp(
                    formData.username,
                    formData.email,
                    formData.password
                );
            }

            if ("message" in response!) {
                setErrorState(response.message);
            }
            console.log("Response:", response);
        } catch (error) {
            setErrorState("An error occurred. Please try again."); // Handle generic error message
            console.error("Error:", error); // Log the error for debugging
        }
    };

    // render form
    return (
        <View style={styles.container}>
            {/* form */}
            <View style={styles.formTitleHolder}>
                {/* logo */}
                <View>
                    <Image style={styles.logo} source={logo} />
                </View>
                {/* form title */}
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
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(e) => handleChange("email", e)}
                    />
                </View>

                {!isSignIn && (
                    <View style={styles.inputHolder}>
                        <TextInput
                            placeholder="Username"
                            value={formData.username}
                            onChangeText={(e) => handleChange("username", e)}
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
