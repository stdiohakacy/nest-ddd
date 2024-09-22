// Interface defining the contract for a generic Repository
export interface BaseRepository<T, ID> {
  findById(id: ID): Promise<T | null>;
  save(entity: T): void;
  delete(id: ID): void;
  findAll(): Promise<T[]>;
  findByCriteria(criteria: any): T[];
}
