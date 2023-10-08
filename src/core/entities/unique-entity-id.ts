/* eslint-disable no-irregular-whitespace */
import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  // the idea of ​this class is to reference a unique id that we will have in our entities - everywhere in the application that needs to create an id, we will have a value-object to work with this information - we can also change the method of creating the id whenever we want
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
