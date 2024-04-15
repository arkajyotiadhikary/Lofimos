import React, { FC, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/PlayerScreen/TrackDetails.style";
import { RootState } from "../../store";
import { songsLike, songUnlike } from "../../services/songService";
import { setLikedSongs } from "../../features/user/userSlice";

const TrackDetails: FC = () => {
    // User id
    const userID = useSelector(
        (state: RootState) => state.userDataReducer.userID
    );
    // Song id
    const songID = useSelector(
        (state: RootState) => state.currentPlayingReducer.songID
    );
    // List of liked songs
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
        if (!like) {
            try {
                await songsLike(userID, songID);
                setLike(!like);
                // Update the liked songs list in Redux after successful like
                dispatch(setLikedSongs([...likedSongs, songID]));
            } catch (error) {
                console.error("Error liking song:", error);
            }
        } else {
            try {
                await songUnlike(userID, songID);
                setLike(!like);
                // Update the liked songs list in Redux after successful like
                dispatch(
                    setLikedSongs(likedSongs.filter((id) => id !== songID))
                );
            } catch (error) {
                console.error("Error unliking song:", error);
            }
        }
    };

    useEffect(() => {
        // Check if the song is already liked by the user on component mount
        // If it is liked by the user set the like button to true
        if (likedSongs.includes(songID)) {
            setLike(true);
        }
        // Else set the like button to false
        else {
            setLike(false);
        }
    }, [songID]);

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
