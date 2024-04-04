// the queue will be update to recently played
import { View, Text, ScrollView } from "react-native";

const RecentlyPlayed = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text>RecentlyPlayed</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: "row" }}
            >
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View
                        style={{
                            width: 150,
                            height: 50,
                            backgroundColor: "red",
                        }}
                    />
                    <View
                        style={{
                            width: 150,
                            height: 50,
                            backgroundColor: "green",
                        }}
                    />
                    <View
                        style={{
                            width: 150,
                            height: 50,
                            backgroundColor: "blue",
                        }}
                    />
                    <View
                        style={{
                            width: 150,
                            height: 50,
                            backgroundColor: "purple",
                        }}
                    />
                    <View
                        style={{
                            width: 150,
                            height: 50,
                            backgroundColor: "orange",
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default RecentlyPlayed;
