export abstract class BaseValueObject<T> {
  // Abstract method to validate the value object, should be implemented by subclasses
  protected abstract validate(): void;

  // Method to compare two value objects based on their properties
  public equals(other: BaseValueObject<T>): boolean {
    if (!other || !(other instanceof BaseValueObject)) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(other);
  }

  // Method to clone the value object, creating a deep copy
  public clone(): this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  // Optionally, method to represent the object as a string
  public toString(): string {
    return JSON.stringify(this);
  }
}
