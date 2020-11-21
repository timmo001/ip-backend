import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('endpoints')
export class EndpointEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  endpoint: string;

  @Column({ type: 'varchar', nullable: false })
  service: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  resultOnly: boolean;

  @Column({ type: 'varchar', nullable: false, default: 'application/json' })
  contentType: string;

  @Column({ type: 'varchar', nullable: false, default: 'info' })
  logLevel: 'debug' | 'info' | 'warn' | 'error';

  @Column({ type: 'varchar', nullable: false, default: 'GET' })
  supportedMethods: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  published: boolean;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;
}
