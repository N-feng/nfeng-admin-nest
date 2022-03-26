import { PhotoEntity } from './../photo/photo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column('varchar')
  password: string;

  @Column()
  status: boolean;

  @OneToMany(() => PhotoEntity, (photo) => photo.user)
  photos: [];
}
