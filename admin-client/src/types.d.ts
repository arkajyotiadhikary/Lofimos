export type UserData = {
      email: string;
      password: string;
};

export type UserResponseData = {
      accessToken: string;
      refreshToken: string;
      sessionID: string;
      role: string;
      userVerified: boolean;
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
