import { Store } from '~/domain/entities/store'
import { StoresRepository } from '../repositories/stores'
import { Either, left, right } from '../shared/either'
import { BadRequest, Created } from '../shared/response'
import { Service } from '../shared/service'
import { CreateUserService } from './create-user'
import { LoadAddressService } from './load-address'

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

export class CreateAccountService
  implements Service<CreateAccountInput, CreateAccountOutput>
{
  constructor(
    private loadAddressService: LoadAddressService,
    private createUserService: CreateUserService,
    private storesRepository: StoresRepository
  ) {}

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
    const { address } = await this.loadAddressService.execute({
      zipCode,
      place,
      number,
      complement,
      referencePoint,
      district,
      city,
      state,
      country
    })

    let store = await this.storesRepository.findByTaxId(taxId)

    if (store) {
      return left(BadRequest.get('Store already exists.'))
    }

    store = Store.instance({
      name,
      phone,
      taxId,
      domain,
      address
    })
    await this.storesRepository.save(store)

    await this.createUserService.execute({
      storeId: store.id,
      name,
      email,
      password
    })

    return right(Created.get('Store created successfully!'))
  }
}
