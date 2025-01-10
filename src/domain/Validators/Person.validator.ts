import { IsNotEmpty, IsString, IsEmail, IsInt, Min } from "class-validator";

export default class PersonValidator {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    age: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
