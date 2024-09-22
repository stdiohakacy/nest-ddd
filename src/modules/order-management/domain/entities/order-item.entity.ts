import { BaseEntity } from 'src/cores/entity.core';
import { Money } from '../value-objects/money.vo';

export class OrderItem extends BaseEntity<string> {
  private _productId: string;
  private _quantity: number;
  private _unitPrice: Money;

  constructor(
    id: string,
    productId: string,
    quantity: number,
    unitPrice: Money,
  ) {
    super(id);
    this._productId = productId;
    this._quantity = quantity;
    this._unitPrice = unitPrice;
    this.validate();
  }

  // Calculate total price for the order item
  public get totalPrice(): Money {
    return this._unitPrice.multiply(this._quantity);
  }

  // get productId
  public get productId(): string {
    return this._productId;
  }

  // get quantity
  public get quantity(): number {
    return this._quantity;
  }

  // get unitPrice
  public get unitPrice(): Money {
    return this._unitPrice;
  }

  // Validate the entity
  validate(): void {
    if (!this._productId) {
      throw new Error('Product ID is required');
    }
    if (this._quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (!this._unitPrice || this._unitPrice.amount <= 0) {
      throw new Error('Unit price must be a valid positive amount');
    }
  }
}
