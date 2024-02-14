import { Entity } from '../shared/entity'

export interface LocationProps {
  zipCode: string
  place: string
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
