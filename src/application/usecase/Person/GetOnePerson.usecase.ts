import { Inject, Injectable } from "@nestjs/common";
import PersonRepository from "../../repository/PersonRepository";
import { PersonEntityProps } from "src/domain/Entity/PersonEntity";

@Injectable()
export default class GetOnePersonUseCase {
    @Inject("PersonRepository") personRepository: PersonRepository;
    async execute(input: Input): Promise<Ouput> {
        const entity = await this.personRepository.getOne(input.id);
        return entity.toDTO();
    }
}

type Input = {
    id: string
}

type Ouput = PersonEntityProps