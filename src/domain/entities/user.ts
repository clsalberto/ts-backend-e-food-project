import { Entity } from '../shared/entity'
import { Replace } from '../shared/replace'

export interface UserProps {
  storeId: string
  name: string
  email: string
  password: string
  createdAt: Date
  active: boolean
}

export class User extends Entity<UserProps> {
  static instance(
    props: Replace<UserProps, { createdAt?: Date; active?: boolean }>,
    id?: string
  ): User {
    return new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        active: props.active ?? false
      },
      id
    )
  }
}
