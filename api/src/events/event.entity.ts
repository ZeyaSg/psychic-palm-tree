import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  dateOfEvent: string;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;
}
