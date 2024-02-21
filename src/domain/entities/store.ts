import { Entity } from '../shared/entity'
import { Replace } from '../shared/replace'
import { Address } from './address'

export interface StoreProps {
  name: string
  phone: string
  taxId: string
  address: Address
  domain: string
  createdAt: Date
}

export class Store extends Entity<StoreProps> {
  static instance(
    props: Replace<StoreProps, { createdAt?: Date }>,
    id?: string
  ): Store {
    return new Store({ ...props, createdAt: props.createdAt ?? new Date() }, id)
  }
}
