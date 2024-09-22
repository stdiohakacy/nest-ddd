export abstract class BaseAggregateRoot<T> {
  // Abstract property for Aggregate ID
  protected readonly _id: T;

  // Domain events array to store events
  private _domainEvents: any[] = [];

  constructor(id: T) {
    this._id = id;
  }

  // Get the ID of the Aggregate Root
  public getId(): T {
    return this._id;
  }

  // Method to compare two Aggregate Roots based on their ID
  public equals(other: BaseAggregateRoot<T>): boolean {
    if (!other) {
      return false;
    }
    return this._id === other.getId();
  }

  // Abstract validate method, to be implemented by subclasses
  protected abstract validate(): void;

  // Domain event handler (optional)
  protected addDomainEvent(event: any): void {
    this._domainEvents.push(event);
  }

  public getDomainEvents(): any[] {
    return this._domainEvents;
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
