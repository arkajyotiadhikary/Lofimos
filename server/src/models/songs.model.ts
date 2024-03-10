import { DataTypes, Model, Sequelize } from "sequelize";

export class Song extends Model {
      public SongID!: number;
      public Title!: string;
      public Artist!: string;
      public Album?: string;
      public ReleaseYear?: number;
      public Genre?: string;
      public Duration?: string;
      public TrackNumber?: number;
      public AudioFilePath!: string;
      public CoverArtPath?: string;
      public ThumbnailPath?: string;
      public Lyrics?: string;
      public Likes!: number;
      public Dislikes!: number;
      public PlayCount!: number;
      public IsFavorite!: boolean;
      public Comments?: string;
      public BPM?: number;
      public Key?: string;
      public Mood?: string;
      public SpotifyLink?: string;
      public AppleMusicLink?: string;
      public YouTubeLink?: string;
      public ArtistWebsite?: string;
      public SampleInformation?: string;
      public Credits?: string;
      public CreatedAt!: Date;

      public readonly createdAt!: Date;
      public readonly updatedAt!: Date;
}

export const initSongModel = (sequelize: Sequelize): void => {
      Song.init(
            {
                  SongID: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                  },
                  Title: {
                        type: DataTypes.STRING(255),
                        allowNull: false,
                  },
                  Artist: {
                        type: DataTypes.STRING(255),
                        allowNull: false,
                  },
                  Album: {
                        type: DataTypes.STRING(255),
                  },
                  ReleaseYear: {
                        type: DataTypes.INTEGER,
                  },
                  Genre: {
                        type: DataTypes.STRING(100),
                  },
                  Duration: {
                        type: DataTypes.TIME,
                  },
                  TrackNumber: {
                        type: DataTypes.INTEGER,
                  },
                  AudioFilePath: {
                        type: DataTypes.STRING(255),
                        allowNull: false,
                  },
                  CoverArtPath: {
                        type: DataTypes.STRING(255),
                  },
                  ThumbnailPath: {
                        type: DataTypes.STRING(255),
                  },
                  Lyrics: {
                        type: DataTypes.TEXT,
                  },
                  Likes: {
                        type: DataTypes.INTEGER,
                        defaultValue: 0,
                  },
                  Dislikes: {
                        type: DataTypes.INTEGER,
                        defaultValue: 0,
                  },
                  PlayCount: {
                        type: DataTypes.INTEGER,
                        defaultValue: 0,
                  },
                  IsFavorite: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                  },
                  Comments: {
                        type: DataTypes.TEXT,
                  },
                  BPM: {
                        type: DataTypes.INTEGER,
                  },
                  Key: {
                        type: DataTypes.STRING(10),
                  },
                  Mood: {
                        type: DataTypes.STRING(100),
                  },
                  SpotifyLink: {
                        type: DataTypes.STRING(255),
                  },
                  AppleMusicLink: {
                        type: DataTypes.STRING(255),
                  },
                  YouTubeLink: {
                        type: DataTypes.STRING(255),
                  },
                  ArtistWebsite: {
                        type: DataTypes.STRING(255),
                  },
                  SampleInformation: {
                        type: DataTypes.TEXT,
                  },
                  Credits: {
                        type: DataTypes.TEXT,
                  },
                  CreatedAt: {
                        type: DataTypes.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                  },
            },
            { sequelize, tableName: "Songs" }
      );
      console.log("Song model has initiated!");
};
