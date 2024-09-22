import { BaseValueObject } from 'src/cores/value-object.core';

export class Money extends BaseValueObject<Money> {
  private readonly _amount: number;
  private readonly _currency: string;

  constructor(amount: number, currency: string) {
    super();
    this._amount = amount;
    this._currency = currency;
    this.validate();
  }

  // Getter for amount
  public get amount(): number {
    return this._amount;
  }

  // Getter for currency
  public get currency(): string {
    return this._currency;
  }

  // Add two Money objects together
  public add(money: Money): Money {
    if (this._currency !== money.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this._amount + money.amount, this._currency);
  }

  // Multiply money by a quantity
  public multiply(quantity: number): Money {
    return new Money(this._amount * quantity, this._currency);
  }

  // Validate the value object
  validate(): void {
    if (this._amount < 0) {
      throw new Error('Amount must be greater than or equal to zero');
    }
    if (!this._currency) {
      throw new Error('Currency is required');
    }
  }
}
