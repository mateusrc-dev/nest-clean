import { Student } from '../../enterprise/entities/student'

export abstract class StudentsRepository {
  // this is repository is only a contract
  // nestjs don't understand typescript, then let's use abstract class
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}
