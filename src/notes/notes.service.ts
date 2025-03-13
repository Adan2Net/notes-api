import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const user = await this.usersRepository.findOne({ where: { id: createNoteDto.userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${createNoteDto.userId} not found.`);
    }

    const note = this.notesRepository.create({
      ...createNoteDto,
      user, // Associate user with the note
    });

    return this.notesRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return this.notesRepository.find({ relations: ['user'] });
  }  

  async findOne(id: number): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id } });
  
    if (!note) {
      throw new NotFoundException(`Note not found.`);
    }
  
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id } });

    if (!note) {
      throw new NotFoundException(`Note not found.`);
    }

    Object.assign(note, updateNoteDto);
    return this.notesRepository.save(note);
  }
  
  async remove(id: number): Promise<string> {
    const note = await this.findOne(id);
    await this.notesRepository.remove(note);
    return `Note successfully deleted.`;
  }
}
