import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event,
} from "react-native-track-player";
import { getAllSong } from "./services/songService";
import { Song } from "../types";
import { type AddTrack } from "react-native-track-player";

// setup player
export const setupPlayer = async () => {
    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrackIndex();
        isSetup = true;
        console.log("Player first try");
    } catch (error) {
        try {
            await TrackPlayer.setupPlayer();
            console.log("Player setuped");
            await TrackPlayer.updateOptions({
                android: {
                    appKilledPlaybackBehavior:
                        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                },
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.SeekTo,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                ],
                progressUpdateEventInterval: 1,
            });
            isSetup = true;
        } catch (error) {
            console.error("Error setting up player:", error);
        }
    } finally {
        return isSetup;
    }
};

// add tracks
export const addTrack = async () => {
    let songs: AddTrack[] | undefined = await getAllSong();

    // Check if songs is undefined or null
    if (!songs) {
        console.log("No songs found in the database");
        return;
    }

    console.log("Songs from db:", songs);

    // Now songs is guaranteed to be an array
    await TrackPlayer.add(songs);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const playbackService = async () => {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        console.log("Event.RemotePause");
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        console.log("Event.RemotePlay");
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        console.log("Event.RemoteNext");
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        console.log("Event.RemotePrevious");
        TrackPlayer.skipToPrevious();
    });
};
