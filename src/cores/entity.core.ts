export abstract class BaseEntity<T> {
  private readonly _id: T;
  private _version: number = 0;

  constructor(id: T) {
    this._id = id;
    this.validateId();
  }

  // Getter for ID
  public get id(): T {
    return this._id;
  }

  // Getter for version
  public get version(): number {
    return this._version;
  }

  // Increment the version when state changes
  public incrementVersion(): void {
    this._version++;
  }

  // Validate ID (can be overridden)
  protected validateId(): void {
    if (!this._id) {
      throw new Error('ID cannot be null or undefined');
    }
  }

  // Method to clone the entity
  public clone(): this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  // Equality check based on ID
  public equals(other: BaseEntity<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this._id === other.id;
  }

  // Abstract validate method to be implemented by subclasses
  abstract validate(): void;

  // Optional method to generate ID (if ID is a string, like UUID)
  protected generateId(): string {
    return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
