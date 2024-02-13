import { Entity } from '../shared/entity'

export interface LocationProps {
  zipCode: string
  place: string
  number: string
  complement?: string
  referencePoint?: string
  district: string
  city: string
  state: string
  country: string
}

export class Location extends Entity<LocationProps> {
  static instance(props: LocationProps, id?: string): Location {
    return new Location({ ...props }, id)
  }
}
