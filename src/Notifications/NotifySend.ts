import { Notifiable } from "./Notifiable";
import * as winston from "winston";
import { logger } from "../logger";

export default class NotifySend implements Notifiable {
  private logger: winston.Logger = logger;

  private readonly notificationLibrary: string;
  private readonly spawner: any;

  public constructor(notificationLibrary: string, spawner: any) {
    this.notificationLibrary = notificationLibrary;
    this.spawner = spawner;
  }

  public notify(title: string, body: string, options?: object): void {
    let response;
    if (options) {
      response = this.spawner(this.notificationLibrary, [title, body, options]);
    } else {
      response = this.spawner(this.notificationLibrary, [title, body]);
    }
    this.logger.debug(response);
  }
}
