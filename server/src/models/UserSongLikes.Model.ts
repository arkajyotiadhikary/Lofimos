import { Sequelize, DataTypes, Model } from "sequelize";

export class UserSongLikes extends Model {
      public userID!: number;
      public SongID!: number;
}

export const initUserSongLikesModel = (sequelize: Sequelize): void => {
      UserSongLikes.init(
            {
                  userID: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                  },
                  SongID: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                  },
            },
            {
                  sequelize,
                  tableName: "UserSongLikes",
            }
      );
      console.log("UserSongPlays model has initiated!");
};
