import { Injectable } from '@nestjs/common';

export interface BaseCommand {
  timestamp: Date;
  readonly commandName: string; // Define specific command name
}

export interface CommandHandler<T extends BaseCommand> {
  handle(command: T): void;
}

@Injectable()
export class CommandDispatcher {
  private handlers: Map<string, CommandHandler<any>> = new Map();

  // Register a handler for a specific command
  public register<T extends BaseCommand>(
    commandName: string,
    handler: CommandHandler<T>,
  ): void {
    this.handlers.set(commandName, handler);
  }

  public dispatch(data): void {
    const { type, payload } = data;

    const commandName = type;
    const handler = this.handlers.get(commandName);
    if (!handler) {
      throw new Error(`No handler found for command: ${commandName}`);
    }
    handler.handle(payload);
  }
}
