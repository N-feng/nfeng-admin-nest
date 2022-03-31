import { hashSync } from 'bcryptjs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getRepository, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) {}

  async findAll() {
    return await this.usersRepository.find({ relations: ['photos'] });
  }

  async findOne(username) {
    const u = await getRepository(UsersEntity).findOne({ where: { username } });
    if (!u) {
      throw new BadRequestException({ code: 400, msg: '找不到用户' })
    }
    return u
  }

  async update(id, user) {
    return await this.usersRepository.update(id , { ...user, password: hashSync(user.password) })
  }

  async delete(id) {
    return await this.usersRepository.delete(id);
  }

  async create(user) {
    const { username } = user;
    const u = await getRepository(UsersEntity).findOne({ where: { username } });

    if (u) {
      throw new BadRequestException({ code: 400, msg: '用户已经注册' })
    }
    return await this.usersRepository.save({ ...user, password: hashSync(user.password) });
  }

  async createMany(users) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      users.forEach(async (user) => {
        await queryRunner.manager.getRepository(UsersEntity).save(user);
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      //你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }
}
