import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type User = {
    userID: number;
    username: string;
    email: string;
    password: string;
    profile_picture?: string;
};

export type Song = {
    SongID: number;
    Title: string;
    Artist: string;
    Album?: string;
    ReleaseYear?: number;
    Genre?: string;
    Duration?: string;
    TrackNumber?: number;
    AudioFilePath: string;
    CoverArtPath?: string;
    ThumbnailPath?: string;
    Lyrics?: string;
    Likes: number;
    Dislikes: number;
    PlayCount: number;
    IsFavorite: boolean;
    Comments?: string;
    BPM?: number;
    Key?: string;
    Mood?: string;
    SpotifyLink?: string;
    AppleMusicLink?: string;
    YouTubeLink?: string;
    ArtistWebsite?: string;
    SampleInformation?: string;
    Credits?: string;
    CreatedAt: Date;
};

// define all the screens
export type AuthStackNavigatorParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type RootStackParamList = {
    Home: undefined;
    Auth: undefined;
    PlayerScreen: undefined;
};

export type RootStackNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    Home,
    Auth,
    PlayerScreen
>;
