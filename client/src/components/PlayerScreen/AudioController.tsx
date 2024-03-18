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

    /**
     * Handle seek action by seeking to the specified value.
     *
     * @param {number} value - The value to seek to
     * @return {void}
     */
    const handleSeek = (value: number): void => {
        TrackPlayer.seekTo(value * duration);
    };

    /**
     * Asynchronously handles skipping to the next track and updating the current playing song.
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const handleSkip = async (): Promise<void> => {
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

    /**
     * Function to handle playing the previous track.
     *
     * @return {Promise<void>} No return value
     */
    const handlePrevious = async (): Promise<void> => {
        TrackPlayer.skipToPrevious();
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

    /**
     * Function to handle playing or pausing audio.
     */
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
                onPrevious={handlePrevious}
            />
        </View>
    );
};

export default AudioController;
