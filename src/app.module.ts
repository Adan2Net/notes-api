import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestuser',
      password: 'nestpassword',
      database: 'noteDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule, NotesModule  // 👈 Asegúrate de que está aquí
  ],
})
export class AppModule {}
