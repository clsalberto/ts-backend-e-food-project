import { Entity } from '../shared/entity'

export interface StoreProps {
  name: string
  phone: string
  taxId: string
  locationId: string
  domain: string
  createdAt: Date
}

export class Store extends Entity<StoreProps> {
  static instance(props: StoreProps, id?: string): Store {
    return new Store({ ...props }, id)
  }
}
