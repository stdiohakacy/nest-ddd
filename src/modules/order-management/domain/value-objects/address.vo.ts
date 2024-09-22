import { BaseValueObject } from 'src/cores/value-object.core';

export class Address extends BaseValueObject<Address> {
  private readonly _street: string;
  private readonly _city: string;
  private readonly _postalCode: string;
  private readonly _country: string;

  constructor(
    street: string,
    city: string,
    postalCode: string,
    country: string,
  ) {
    super();
    this._street = street;
    this._city = city;
    this._postalCode = postalCode;
    this._country = country;
    this.validate();
  }

  // Getter methods for address components
  public get street(): string {
    return this._street;
  }

  public get city(): string {
    return this._city;
  }

  public get postalCode(): string {
    return this._postalCode;
  }

  public get country(): string {
    return this._country;
  }

  // Validate the value object
  validate(): void {
    if (!this._street || !this._city || !this._postalCode || !this._country) {
      throw new Error('All address fields are required');
    }
  }
}
