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
      define: {
        underscored: true, // Standardizes the table column names, use fields when needed in model
        underscoredAll: true, // Standardizes the table names
      },
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
      Community: this.sequelize.import("./community"),
      Organisation: this.sequelize.import("./organisation"),
      Post: this.sequelize.import("./post"),
      User: this.sequelize.import("./user"),
    };
  }

  private associateModels() {
    Object.keys(this.models).forEach((modelName) => {
      if (this.models[modelName].associate) {
        this.models[modelName].associate(this.models);
      }
    });
  }

}
