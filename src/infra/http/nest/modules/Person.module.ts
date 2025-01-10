import { Module, Provider } from "@nestjs/common";
import CreatePersonUseCase from "src/application/usecase/Person/CreatePerson.usecase";
import DeletePersonUseCase from "src/application/usecase/Person/DeletePerson.usecase";
import GetAllPersonUseCase from "src/application/usecase/Person/GetAllPerson.usecase";
import GetOnePersonUseCase from "src/application/usecase/Person/GetOnePerson.usecase";
import UpdatePersonUseCase from "src/application/usecase/Person/UpdatePerson.usecase";
import PrismaPersonRepository from "src/infra/repository/PrismaPersonRepository";
import { PersonController } from "../controller/Person.controller";

const personRepositoryProviders: Provider[] = [
    {provide: "PersonRepository", useClass: PrismaPersonRepository},
];

const personUseCaseProviders: Provider[] = [
    CreatePersonUseCase,
    DeletePersonUseCase,
    UpdatePersonUseCase,
    GetOnePersonUseCase,
    GetAllPersonUseCase
];

@Module({
    imports: [],
    controllers: [
        PersonController,
    ],
    providers: [
        ...personRepositoryProviders,
        ...personUseCaseProviders,
    ],
    exports: [
        ...personRepositoryProviders,
        ...personUseCaseProviders,
    ]
})
export class PersonModule {}