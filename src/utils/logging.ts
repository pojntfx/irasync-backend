import {
  Category,
  CategoryConfiguration,
  CategoryLogger,
  CategoryServiceFactory,
  LogLevel,
} from "typescript-logging";

// Normal logs should be infos
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));

/**
 * Provide a logging category for events happening in the startup class
 */
export const catStartup = new Category("startup");
