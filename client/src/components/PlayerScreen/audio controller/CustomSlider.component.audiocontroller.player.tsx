import React, { FC } from "react";
import Slider from "@react-native-community/slider";
import styles from "../../../styles/PlayerScreen/AudioController.style";

interface CustomSliderProps {
    value: number;
    onSlidingComplete: (value: number) => void;
}

const CustomSlider: FC<CustomSliderProps> = ({ value, onSlidingComplete }) => (
    <Slider
        style={styles.slider}
        thumbTintColor="black"
        maximumTrackTintColor="black"
        minimumTrackTintColor="black"
        onSlidingComplete={onSlidingComplete}
        value={value}
    />
);

export default CustomSlider;
