import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import PersonRepository from "../../repository/PersonRepository";
import PersonEntity, { PersonEntityProps } from "src/domain/Entity/PersonEntity";

@Injectable()
export default class CreatePersonUseCase {
    @Inject("PersonRepository") personRepository: PersonRepository;

    async execute(input: Input): Promise<Output> {
        const entity = new PersonEntity(input);
        const errors = await entity.validate();
        if (errors.length) {
            console.log(errors);
            throw new BadRequestException(errors);
        }
        await this.personRepository.save(entity);
        return {
            id: entity.id,
        }
    }
}

export type Input = PersonEntityProps

type Output = {
    id: string
}