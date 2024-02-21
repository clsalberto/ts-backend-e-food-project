import { Address } from '~/domain/entities/address'
import { Location } from '~/domain/entities/location'
import { AddressesRepository } from '../repositories/addresses'
import { LocationsRepository } from '../repositories/locations'
import { Service } from '../shared/service'

interface AddressInput {
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

interface AddressOutput {
  address: Address
}

export class LoadAddressService
  implements Service<AddressInput, AddressOutput>
{
  constructor(
    private locationsRepository: LocationsRepository,
    private addressesRepository: AddressesRepository
  ) {}

  async execute({
    zipCode,
    place,
    number,
    complement,
    referencePoint,
    district,
    city,
    state,
    country
  }: AddressInput): Promise<AddressOutput> {
    let location = await this.locationsRepository.findByZipCode(zipCode)

    if (!location) {
      location = Location.instance({
        zipCode,
        place,
        district,
        city,
        state,
        country
      })
      await this.locationsRepository.save(location)
    }

    let address = await this.addressesRepository.findAddress(
      location.id,
      number,
      complement,
      referencePoint
    )

    if (!address) {
      address = Address.instance({
        location,
        number,
        complement,
        referencePoint
      })
      await this.addressesRepository.save(address)
    }

    return { address }
  }
}
