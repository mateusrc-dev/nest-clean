export abstract class ValueObject<Props> {
  // generic (a parameter of types) to receive props of entities - this class will be the class father
  protected props: Props // this property has reference to all fields of our entity - 'protected' can be accessed by every class that extends the Entity class and accessed by this Entity class

  protected constructor(props: Props) {
    // 'protected' can be accessed by every class that extends the Entity class and accessed by this Entity class
    this.props = props
  }

  public equals(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    return JSON.stringify(vo.props) === JSON.stringify(this.props)
  }
}
