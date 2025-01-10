import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Module } from "@nestjs/common";
import { PersonModule } from "./modules/Person.module";

@Module({
    imports: [
        PersonModule    
    ],
    controllers: [],
})
export class AppModule {}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    response.status(status).json({
      statusCode: status,
      message: 'Internal server error',
    });
  }
}