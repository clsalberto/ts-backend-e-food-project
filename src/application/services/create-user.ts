import { User } from '~/domain/entities/user'
import { HashAdapter } from '../adapters/hash'
import { MailAdapter } from '../adapters/mail'
import { StoresRepository } from '../repositories/stores'
import { UsersRepository } from '../repositories/users'
import { Either, left, right } from '../shared/either'
import { BadRequest, Created } from '../shared/response'
import { Service } from '../shared/service'

interface CreateUserInput {
  storeId: string
  name: string
  email: string
  password: string
}

type CreateUserOutput = Either<BadRequest, Created>

export class CreateUserService
  implements Service<CreateUserInput, CreateUserOutput>
{
  constructor(
    private storesRepository: StoresRepository,
    private usersRepository: UsersRepository,
    private hashAdapter: HashAdapter,
    private mailAdapter: MailAdapter
  ) {}

  async execute({
    storeId,
    name,
    email,
    password
  }: CreateUserInput): Promise<CreateUserOutput> {
    let user = await this.usersRepository.findByEmail(email)

    if (user) {
      return left(BadRequest.get('User already exists.'))
    }

    const store = await this.storesRepository.findById(storeId)

    const passwordHash = await this.hashAdapter.encript(password)

    user = User.instance({ storeId, name, email, password: passwordHash })

    await this.usersRepository.save(user)

    await this.mailAdapter.send({
      from: { name: user.props.name, email: user.props.email },
      subject: `${store.props.name} - User ${user.props.name} created successfully`,
      body: `Welcome, ${user.props.name}!`
    })

    return right(Created.get('User created successfully.'))
  }
}
