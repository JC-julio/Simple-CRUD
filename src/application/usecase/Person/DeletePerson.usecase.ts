import { Inject, Injectable } from "@nestjs/common";
import PersonRepository from "../../repository/PersonRepository";


@Injectable()
export default class DeletePersonUseCase {
    @Inject("PersonRepository") personRepository: PersonRepository

    async execute(input: input): Promise<Output> {
        await this.personRepository.delete(input.id)
    }
}

type input = {
    id: string
}

type Output = void