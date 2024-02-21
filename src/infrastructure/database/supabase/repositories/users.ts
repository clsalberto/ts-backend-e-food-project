import { UsersRepository } from '~/application/repositories/users'
import { DatabaseError } from '~/application/shared/response'
import { User } from '~/domain/entities/user'
import { supabase } from '..'

export class SupabaseUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | undefined | null> {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)

    if (error) {
      console.error(DatabaseError.get(error.message))
    }

    const user = data ? data[0] : null

    return user
      ? User.instance(
        {
          storeId: user.store_id,
          createdAt: new Date(user.created_at),
          ...user
        },
        user.id
      )
      : null
  }

  async save(user: User, update?: boolean | undefined): Promise<void> {
    if (update) {
      const { error } = await supabase
        .from('users')
        .update({
          ...user.props,
          store_id: user.props.storeId,
          created_at: user.props.createdAt.toISOString()
        })
        .eq('id', user.id)

      if (error) console.error(DatabaseError.get(error.message))
    } else {
      const { error } = await supabase.from('users').insert({
        id: user.id,
        ...user.props,
        created_at: user.props.createdAt.toISOString(),
        store_id: user.props.storeId
      })

      if (error) console.error(DatabaseError.get(error.message))
    }
  }
}
