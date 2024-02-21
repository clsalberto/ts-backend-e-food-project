import { Entity } from '../shared/entity'
import { Location } from './location'

export interface AddressProps {
  location: Location
  number: string
  complement?: string
  referencePoint?: string
}

export class Address extends Entity<AddressProps> {
  static instance(props: AddressProps, id?: string): Address {
    return new Address({ ...props }, id)
  }
}
