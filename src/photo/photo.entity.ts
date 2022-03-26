import { UsersEntity } from './../users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photo' })
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.photos)
  user: UsersEntity;

  @Column({ type: 'varchar', length: 80 })
  url: string;
}
