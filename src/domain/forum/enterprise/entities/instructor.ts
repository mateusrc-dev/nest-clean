import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  // we let's inherit properties from this father class
  get name() {
    // method get - for property to be access outside this entity
    return this.props.name
  }

  static create(props: InstructorProps, id?: UniqueEntityID) {
    // let's create this method because the constructor in the parent Entity class is now 'protected' - let's do this to be able to create a new instructor outside of classes that inherit this parent class
    const instructor = new Instructor(props, id) // we can call Instructor class because we extend Entity class

    return instructor
  }
}
