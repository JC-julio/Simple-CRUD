import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import PersonRepository from "../../repository/PersonRepository";
import PersonEntity, { PersonEntityProps } from "src/domain/Entity/PersonEntity";

@Injectable()
export default class UpdatePersonUseCase {
    @Inject("PersonRepository") personRepository: PersonRepository

    async execute(input: Input): Promise<Output> {
        const entity = new PersonEntity(input)
        const errors = await entity.validate()
        if (errors.length) {
            console.log(errors)
            throw new BadRequestException(errors)
        }
        await this.personRepository.update(entity)
        return {
            id: input.id
        }
    }
}

export type Input = PersonEntityProps;

type Output = {
    id: string
}