import { Notifiable } from "./Notifiable";
import * as winston from "winston";
import { logger } from "../logger";

export default class NotifySend implements Notifiable {
  private logger: winston.Logger = logger;

  private readonly notificationLibrary: string;
  private readonly spawner: any;

  private options: object | null = null;

  public constructor(notificationLibrary: string, spawner: any) {
    this.notificationLibrary = notificationLibrary;
    this.spawner = spawner;
  }

  public setOptions(options: object): void {
    this.options = options;
  }

  public notify(title: string, body: string): void {
    let response;
    if (this.options) {
      response = this.spawner(this.notificationLibrary, [
        title,
        body,
        this.options
      ]);
    } else {
      response = this.spawner(this.notificationLibrary, [title, body]);
    }
    this.logger.info(response);
  }
}
