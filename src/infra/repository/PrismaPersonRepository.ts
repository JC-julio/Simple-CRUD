import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import PersonRepository from "src/application/repository/PersonRepository";
import PersonEntity from "src/domain/Entity/PersonEntity";
import { PrismaAdapter } from "../database/PrismaAdapter";
import { Dictionary } from "src/domain/utils/Dictionary";

type PersonSaveInput = PersonEntity

@Injectable()
export default class PrismaPersonRepository implements PersonRepository {
    @Inject("PrismaAdapter") prisma: PrismaAdapter;

    async save(entity: PersonSaveInput) {
        try {
            await this.prisma.person.create({
                data: {
                    ...entity
                },
            });
        } catch(e:any) {
            throw new BadRequestException(e.message)
        }
    }

    async getOne(id:string): Promise<PersonEntity> {
        const data = await this.prisma.person.findUnique({
            where: {
                id
            },
        })
        if (!data) throw new Error("Person not found!");
        return this.convertToEntity(data)
    }

    async getAll(filters: Dictionary): Promise<Array<PersonEntity>> {
        const data = await this.prisma.person.findMany({
            where: {
                ...filters
            }
        })
        return data.map(person => this.convertToEntity(person))
    }

    async delete(id:string): Promise<void> {
        await this.prisma.person.delete({
            where: {id}
        })
    }

    async update({id, ...entity}: PersonSaveInput): Promise<void> {
        try {
            await this.prisma.person.update({
                where: {id},
                data: {
                    ...entity
                }
            })
        } catch(e: any) {
            throw new BadRequestException(e.message)
        }
    }

    convertToEntity(data: any) {
        return new PersonEntity({
          ...data
        });
      }
}