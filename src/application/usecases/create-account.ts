import { Address } from '~/domain/entities/address'
import { Location } from '~/domain/entities/location'
import { Store } from '~/domain/entities/store'
import { User } from '~/domain/entities/user'
import { AddressesRepository } from '../repositories/addresses'
import { LocationsRepository } from '../repositories/locations'
import { StoresRepository } from '../repositories/stores'
import { UsersRepository } from '../repositories/users'
import { Either, left, right } from '../shared/either'
import { BadRequest, Created } from '../shared/response'
import { UseCase } from '../shared/usecase'

interface CreateAccountInput {
  name: string
  email: string
  phone: string
  taxId: string
  password: string
  domain: string
  zipCode: string
  place: string
  number: string
  complement: string
  referencePoint: string
  district: string
  city: string
  state: string
  country: string
}

type CreateAccountOutput = Either<BadRequest, Created>

export class CreateAccount
  implements UseCase<CreateAccountInput, CreateAccountOutput>
{
  constructor(
    private locationsRepository: LocationsRepository,
    private addressesRepository: AddressesRepository,
    private storesRepository: StoresRepository,
    private usersRepository: UsersRepository
  ) { }

  async execute({
    name,
    email,
    password,
    phone,
    taxId,
    domain,
    zipCode,
    place,
    number,
    complement,
    referencePoint,
    district,
    city,
    state,
    country
  }: CreateAccountInput): Promise<CreateAccountOutput> {
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
      complement
    )

    if (!address) {
      address = Address.instance({
        locationId: location.id,
        number,
        complement,
        referencePoint
      })
      await this.addressesRepository.save(address)
    }

    let store = await this.storesRepository.findByTaxId(taxId)

    if (store) {
      return left(BadRequest.get('Store already exists.'))
    }

    store = Store.instance({
      name,
      phone,
      taxId,
      domain,
      addressId: address.id
    })
    await this.storesRepository.save(store)

    let user = await this.usersRepository.findByEmail(email)

    if (user) {
      return left(BadRequest.get('User already exists.'))
    }

    user = User.instance({ storeId: store.id, name, email, password })
    await this.usersRepository.save(user)

    return right(Created.get('Store created successfully!'))
  }
}
