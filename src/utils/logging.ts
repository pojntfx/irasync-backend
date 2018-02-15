import {
  Category,
  CategoryConfiguration,
  CategoryLogger,
  CategoryServiceFactory,
  LogLevel,
} from "typescript-logging";

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));

export const catStartup = new Category("startup");
