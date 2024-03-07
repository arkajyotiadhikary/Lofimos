import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event,
} from "react-native-track-player";

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
    await TrackPlayer.add([
        // TODO we can use online audio here . it just needed the urls. we have to create some apis for that in the future
        {
            id: "1",
            url: require("../assets/fluidity-100-ig-edit-4558.mp3"),
            title: "Fluidity",
            artist: "tobylane",
            duration: 60,
        },
        {
            id: "2",
            url: require("../assets/penguinmusic-modern-chillout-future-calm-12641.mp3"),
            title: "Modern Chillout",
            artist: "penguinmusic",
            duration: 66,
        },
        {
            id: "3",
            url: require("../assets/powerful-beat-121791.mp3"),
            title: "Powerful Beat",
            artist: "penguinmusic",
            duration: 73,
        },
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

// TODO remote event handler
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
