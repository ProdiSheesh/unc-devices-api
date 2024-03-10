import Category from 'src/categories/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'devices',
})
export default class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tagNumber: string;

  @Column({ nullable: true })
  serialNumber: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ default: 'AVAILABLE' })
  status: string;

  @ManyToOne(() => Category, (category) => category.devices)
  @JoinColumn()
  category: Category;
}
