import { OptionalId } from "../utils/OptionalId"
import { cloneDeep } from "lodash";
import crypto from 'crypto';
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import PersonValidator from "../Validators/Person.validator";

export interface PersonEntityProps {
    id?: string
    name: string
    lastName: string
    age: number
    email: string
}

export default class PersonEntity {
    id:string
    name:string
    lastName:string
    age:number
    email:string

    constructor(props: OptionalId<PersonEntityProps>) {
        Object.assign(this, cloneDeep(props))
        this.id = props.id || crypto.randomUUID()
    }

    validate() {
        const object = plainToInstance(PersonValidator, this);
        return validate(object)
    }

    toDTO() {
        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            age: this.age,
            email: this.email,
        }
    }
}
