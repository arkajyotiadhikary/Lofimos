import { AppRegistry } from "react-native";
import TrackPlayer from "react-native-track-player";
import App from "./App";
import { expo } from "../app.json";
import { playbackService } from "./trackPlayerServices";

interface ExpoConfig {
      name: string;
}

const { name }: ExpoConfig = expo;

// Register the main component
AppRegistry.registerComponent(name, () => App);
// Register the playback service for the trackPlayer
TrackPlayer.registerPlaybackService(() => playbackService);
