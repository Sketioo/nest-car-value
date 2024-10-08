import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string): void {
    const user = this.repo.create({ email, password });

    this.repo.save(user);
  }

  findOne(id: number) {
    const user = this.repo.findOneBy({ id });

    return user;
  }

  find(email: string) {
    const users = this.repo.find({ where: { email } });

    return users;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return this.repo.remove(user);
  }
}
