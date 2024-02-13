import { randomUUID } from 'node:crypto'

export class Entity<T> {
  private _id: string
  public props: T

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  get id(): string {
    return this._id
  }
}
