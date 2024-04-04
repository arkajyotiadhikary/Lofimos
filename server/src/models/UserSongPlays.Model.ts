import { Sequelize, DataTypes, Model } from "sequelize";
export class UserSongPlays extends Model {
      public userID!: number;
      public songID!: number;
}

export const initUserSongPlaysModel = (sequelize: Sequelize): void => {
      UserSongPlays.init(
            {
                  userID: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                  },
                  songID: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                  },
            },
            {
                  sequelize,
                  tableName: "UserSongPlays",
            }
      );
      console.log("UserSongPlays model has initiated!");
};
