import { Address } from '~/domain/entities/address'
import { Location, LocationProps } from '~/domain/entities/location'

export interface AddressesRepository {
  createLocation(data: LocationProps): Promise<Location>
  findLocation(zipCode: string): Promise<Location>
  findAddress(
    locationId: string,
    number: string,
    complement?: string,
    referencePoint?: string
  ): Promise<Address>
  save(address: Address, update?: boolean): Promise<void>
}
