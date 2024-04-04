import { Dispatch, SetStateAction, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadCachedResult = async (itemName: string) => {
    try {
        const cachedResults = await AsyncStorage.getItem(itemName);
        if (cachedResults) {
            return JSON.parse(cachedResults);
        }
    } catch (error) {
        console.error("Error loading cached results:", error);
    }
};

// TODO add all async storage methods here
export const saveCachedResult = async (itemName: string, value: any) => {
    try {
        await AsyncStorage.setItem(itemName, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving cached results:", error);
    }
};
