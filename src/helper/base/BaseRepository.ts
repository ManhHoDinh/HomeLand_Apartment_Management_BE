export abstract class BaseRepository<CreateEntityDto, UpdateEntityDto, Entity> {
  abstract create(createDto: CreateEntityDto): Promise<Entity>;
  abstract findOne(id: any): Promise<Entity | null>;
}
