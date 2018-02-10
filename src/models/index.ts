import * as Sequelize from "sequelize";

/**
 * The models and the database.
 */
export default class Database {

  public models: any;

  public sequelize: any;
  private Sequelize: any;

  constructor({
    dbName,
    dbPassword,
    dbUserName,
  }) {
    try {
      // Create a new sequelize instance
      this.createSequelize({
        dbName,
        dbPassword,
        dbUserName,
      });
      // Create the models from the imports
      this.createModels();
      // Associate the models with the tables
      this.associateModels();
    } catch (e) {
      throw new Error(e);
    }
  }

  private createSequelize({
    dbName,
    dbUserName,
    dbPassword,
  }) {
    this.sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
      dialect: "postgres",
      operatorsAliases: {
        $and: Sequelize.Op.and,
        $eq: Sequelize.Op.eq,
        $gt: Sequelize.Op.gt,
        $like: Sequelize.Op.like,
        $lt: Sequelize.Op.lt,
        $lte: Sequelize.Op.lte,
        $or: Sequelize.Op.or,
      },
    });
    this.Sequelize = Sequelize;
  }

  private createModels() {
    this.models = {
      // user: this.sequelize.import("./users"),
    };
  }

  private associateModels() {
    // Object.keys(this).forEach((modelName) => {
    //   if (this[modelName].associate) {
    //     this[modelName].associate(this);
    //   }
    // });
  }

}
