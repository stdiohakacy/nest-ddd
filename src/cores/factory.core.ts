export interface BaseFactory<T> {
  create(...args: any[]): T;
}
