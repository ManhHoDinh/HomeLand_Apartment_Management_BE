/**
 * Base class for all CRUD services
 */
export abstract class BaseService<Entity> {
    abstract create(createDto: any): Promise<Entity>;
    abstract findOne(id: string): Promise<Entity | null>;
    abstract findAll(): Promise<Entity[]>;
    abstract update(id: string, updateDto: any): Promise<boolean>;
    abstract softDelete(id: any): Promise<boolean>;
}
