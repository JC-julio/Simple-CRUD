import { Inject, Injectable } from "@nestjs/common";
import PersonRepository from "../../repository/PersonRepository";
import { Dictionary } from "src/domain/utils/Dictionary";
import DatabaseFilter from "src/domain/utils/DatabaseFilter";
import PersonEntity, { PersonEntityProps } from "src/domain/Entity/PersonEntity";

@Injectable()
export default class GetAllPersonUseCase {
    @Inject("PersonRepository") personRepository: PersonRepository

    async execute(filters: Dictionary): Promise<Output> {
        const dbFilter = new DatabaseFilter(filters)
        const entity: PersonEntity[] = await this.personRepository.getAll(dbFilter);
        const output = []
        for (let item of entity) {
            output.push(item.toDTO)
        }
        return output
    }
}

type Output = Array<PersonEntityProps>