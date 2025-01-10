import PersonEntity from "src/domain/Entity/PersonEntity";
import { Dictionary } from "src/domain/utils/Dictionary";

export default interface PersonRepository{
    getOne(id: string): Promise<PersonEntity>
    delete(id: string): Promise<void>
    getAll(filters: Dictionary): Promise<Array<PersonEntity>>
    save(entity: PersonEntity): Promise<void>
    update(entity: PersonEntity): Promise<void>
} 