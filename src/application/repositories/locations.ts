import { Location } from '~/domain/entities/location'

export interface LocationsRepository {
  findByZipCode(zipCode: string): Promise<Location | undefined | null>
  save(location: Location, update?: boolean): Promise<void>
}
