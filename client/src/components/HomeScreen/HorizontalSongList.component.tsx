import { View, Text, Image, VirtualizedList } from "react-native";
import styles from "../../styles/HomeScreen/HorizontalSongList.style";
import { AddTrack } from "react-native-track-player";
import { FC } from "react";

interface HorizontalSongListProps {
    headerTitle: string;
    songs: AddTrack[];
}

interface ItemData {
    id: string;
    title: string;
    artwork?: string;
    artist: string;
}

const HorizontalSongList: FC<HorizontalSongListProps> = ({
    headerTitle,
    songs,
}) => {
    const getItemCount = (_data: AddTrack[] | null) => songs.length;

    const getItem = (_data: AddTrack[] | null, index: number): ItemData => ({
        id: songs[index].id,
        title: songs[index].title!,
        artwork: songs[index].artwork!,
        artist: songs[index].artist!,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <VirtualizedList
                data={songs}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ item, index }) => (
                    <View style={styles.item} key={index}>
                        <Image
                            style={styles.itemImage}
                            source={{ uri: item.artwork }}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemArtist}>{item.artist}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`}
            />
        </View>
    );
};

export default HorizontalSongList;
