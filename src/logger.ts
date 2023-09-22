import { FastifyBaseLogger, FastifyRequest } from 'fastify';

class Logger {
  protected logger: FastifyBaseLogger;
  protected functionName: string;
  protected className: string;

  constructor(logger: FastifyBaseLogger, functionName: string, className: string) {
    this.logger = logger;
    this.functionName = functionName;
    this.className = className;
  }

  public entry() {
    this.logger.info(`Entering ${this.className}||${this.functionName}`);
  }

  public exit() {
    this.logger.info(`Exiting  ${this.className}||${this.functionName}`);
  }

  public info(log: string) {
    this.logger.info(`${this.className}||${this.functionName} || ${log}`);
  }

  public debug(log: string) {
    this.logger.debug(`${this.className}||${this.functionName}|| ${log}`);
  }

  public error(err: Error, message: string) {
    this.logger.error(` ${this.className}||${this.functionName} || ${message}`, err);
  }

}

export default Logger;