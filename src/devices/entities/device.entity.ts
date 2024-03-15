import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeviceStatus } from '../enum/device-status.enum';
import { Category } from 'src/categories/entities/category.entity';

@Entity({
  name: 'devices',
})
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  tagNumber: string;

  @Column({ nullable: true, unique: true })
  serialNumber: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ type: 'enum', enum: DeviceStatus, default: DeviceStatus.AVAILABLE })
  status: DeviceStatus;

  @ManyToOne(() => Category, (category) => category.devices)
  @JoinColumn()
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
