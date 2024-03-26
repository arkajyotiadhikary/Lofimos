import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
      public userID!: number;
      public username!: string;
      public email!: string;
      public password!: string;
      public profile_picture?: string;
}

export const initUserModel = (sequelize: Sequelize): void => {
      User.init(
            {
                  userID: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                  },
                  username: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  email: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  password: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  profile_picture: {
                        type: DataTypes.STRING,
                  },
                  isAdmin: {
                        type: DataTypes.BOOLEAN,
                        allowNull: false,
                        defaultValue: false,
                  },
                  accessToken: {
                        type: DataTypes.STRING,
                  },
                  refreshToken: {
                        type: DataTypes.STRING,
                  },
                  sessionID: {
                        type: DataTypes.STRING,
                  },
            },
            {
                  sequelize,
                  tableName: "Users",
            }
      );
      console.log("User model has initiated!");
};
