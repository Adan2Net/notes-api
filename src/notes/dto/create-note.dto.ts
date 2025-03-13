import { IsInt, IsNotEmpty } from 'class-validator';
import { FindOperator } from 'typeorm';

export class CreateNoteDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Content is required' })
  content: string;
  
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
