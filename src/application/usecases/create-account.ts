import { UseCase } from '../shared/usecase'

interface CreateAccountInput {
  name: string
}

interface CreateAccountOutput {
  message: string
}

export class CreateAccount
  implements UseCase<CreateAccountInput, CreateAccountOutput>
{
  async execute({ name }: CreateAccountInput): Promise<CreateAccountOutput> {
    return { message: `Welcome to ${name}!` }
  }
}
