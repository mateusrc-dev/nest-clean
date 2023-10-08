import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  // generic (a parameter of types) to receive props of entities - this class will be the class father
  private _id: UniqueEntityID // so no file can change this id directly
  protected props: Props // this property has reference to all fields of our entity - 'protected' can be accessed by every class that extends the Entity class and accessed by this Entity class
  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    // 'protected' can be accessed by every class that extends the Entity class and accessed by this Entity class
    this.props = props
    this._id = id ?? new UniqueEntityID(id)
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
