export abstract class BaseRepository<CreateEntityDto, Entity> {
    abstract create(createDto: CreateEntityDto): Promise<Entity>;
    abstract findOne(id: any): Promise<Entity | null>;
    abstract findAll(): Promise<Entity[]>;
    abstract update(id: any, updateDto: any): Promise<boolean>;
    abstract remove(id: any): Promise<boolean>;
}
