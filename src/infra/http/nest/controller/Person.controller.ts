import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import CreatePersonUseCase from "src/application/usecase/Person/CreatePerson.usecase";
import { Input as UpdateInput } from 'src/application/usecase/Person/UpdatePerson.usecase';
import DeletePersonUseCase from "src/application/usecase/Person/DeletePerson.usecase";
import GetAllPersonUseCase from "src/application/usecase/Person/GetAllPerson.usecase";
import GetOnePersonUseCase from "src/application/usecase/Person/GetOnePerson.usecase";
import UpdatePersonUseCase from "src/application/usecase/Person/UpdatePerson.usecase";
import { Dictionary } from "src/domain/utils/Dictionary";
import PersonValidator from "src/domain/Validators/Person.validator";

@Controller('person')
export class PersonController {
    @Inject(CreatePersonUseCase) createPersonUseCase: CreatePersonUseCase;
    @Inject(GetAllPersonUseCase) getAllPersonUseCase: GetAllPersonUseCase;
    @Inject(GetOnePersonUseCase) getOnePersonUseCase: GetOnePersonUseCase;
    @Inject(UpdatePersonUseCase) updatePersonUseCase: UpdatePersonUseCase;
    @Inject(DeletePersonUseCase) deletePersonUseCase: DeletePersonUseCase;

    @Post()
    async create(@Body() createInput: PersonValidator) {
        return await this.createPersonUseCase.execute(createInput);
    }

    @Get()
    async findAll(@Query() filters: Dictionary) {
        return await this.getAllPersonUseCase.execute(filters);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.getOnePersonUseCase.execute({ id });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: UpdateInput) {
        return await this.updatePersonUseCase.execute(updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.deletePersonUseCase.execute({ id });
    }
}