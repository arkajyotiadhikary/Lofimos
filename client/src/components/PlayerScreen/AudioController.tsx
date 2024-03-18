import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageSourcePropType,
} from "react-native";

import TrackPlayer, { useProgress } from "react-native-track-player";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
    setCurrentAudioControls,
    setCurrentPlayingSong,
} from "../../features/song/songSlice";
import CustomSlider from "./audio controller/CustomSlider";
import TimeDisplay from "./audio controller/TimeDisplay";
import PlaybackControls from "./audio controller/PlaybackControls";

const AudioController = () => {
    const dispatch = useDispatch();
    const { isPlaying } = useSelector(
        (state: RootState) => state.songControlsReducer
    );
    const [sliderValue, setSliderValue] = useState(0);
    const { position, duration } = useProgress();

    useEffect(() => {
        if (duration && position) {
            setSliderValue(position / duration);
        }
    }, [position, duration]);

    const handleSeek = (value: number) => {
        TrackPlayer.seekTo(value * duration);
    };

    const handleSkip = async () => {
        TrackPlayer.skipToNext();
        const activeTrack = await TrackPlayer.getActiveTrack();
        dispatch(
            setCurrentPlayingSong({
                artist: activeTrack?.artist || "",
                title: activeTrack?.title || "",
                artwork: { uri: activeTrack?.artwork || "" },
                audioIndex: activeTrack?.id,
            })
        );
    };

    const handlePlayPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
        dispatch(setCurrentAudioControls({ isPlaying: !isPlaying }));
    };

    return (
        <View>
            <CustomSlider value={sliderValue} onSlidingComplete={handleSeek} />
            <TimeDisplay position={position} duration={duration} />
            <PlaybackControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onSkip={handleSkip}
            />
        </View>
    );
};

export default AudioController;
