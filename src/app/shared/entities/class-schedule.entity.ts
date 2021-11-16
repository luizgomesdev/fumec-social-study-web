import { Classes } from 'src/app/shared/entities/classes.entity';
import { Semester } from 'src/app/shared/entities/semesters.entity';
export class ClassSchedule {
  id!: string;

  semesterId!: string;
  semester?: Semester;

  classId!: string;
  class?: Classes;

  date!: Date;

  userId!: string;

  createdAt!: Date;

  updatedAt!: Date;

  constructor(data?: Partial<ClassSchedule>) {
    Object.assign(this, data);
  }
}
