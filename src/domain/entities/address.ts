import { Entity } from '../shared/entity'

export interface AddressProps {
  locationId: string
  number: string
  complement?: string
  referencePoint?: string
}

export class Address extends Entity<AddressProps> {
  static instance(props: AddressProps, id?: string): Address {
    return new Address({ ...props }, id)
  }
}
