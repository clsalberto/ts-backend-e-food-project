import { User } from '~/domain/entities/user'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | undefined | null>
  save(user: User, update?: boolean): Promise<void>
}
