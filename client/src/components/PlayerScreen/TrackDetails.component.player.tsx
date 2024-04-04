import React, { FC, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/PlayerScreen/TrackDetails.style";
import { RootState } from "../../store";
import { songsLike } from "../../services/songService";
import { setLikedSongs } from "../../features/user/userSlice";

const TrackDetails: FC = () => {
    // user id
    const userID = useSelector(
        (state: RootState) => state.userDataReducer.userID
    );
    // song id
    const songID = useSelector(
        (state: RootState) => state.currentPlayingReducer.songID
    );
    // list of liked songs
    const likedSongs = useSelector(
        (state: RootState) => state.likedSongsReducer
    );
    const dispatch = useDispatch();

    // Select artist and title from Redux store
    const { artist, title } = useSelector(
        (state: RootState) => state.currentPlayingReducer
    );
    const [like, setLike] = useState(false);

    const handleLike = async () => {
        try {
            await songsLike(userID, songID);
            setLike(!like);
            // Update the liked songs list in Redux after successful like
            dispatch(setLikedSongs([...likedSongs, songID]));
        } catch (error) {
            console.error("Error liking song:", error);
        }
    };

    useEffect(() => {
        console.log(likedSongs);
        // Check if the song is already liked by the user on component mount
        if (likedSongs.includes(songID)) {
            setLike(true);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View>
                {/* Track Title */}
                <Text style={styles.textTitle}>{title}</Text>
                {/* Artist Name */}
                <Text>{artist}</Text>
            </View>
            {/* Like Button - a heart icon */}
            <TouchableOpacity onPress={handleLike}>
                <Entypo name="heart" size={24} color={like ? "red" : "black"} />
            </TouchableOpacity>
        </View>
    );
};

export default TrackDetails;
