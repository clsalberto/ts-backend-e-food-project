import { LocationsRepository } from '~/application/repositories/locations'
import { DatabaseError } from '~/application/shared/response'
import { Location } from '~/domain/entities/location'
import { supabase } from '..'

export class SupabaseLocationsRepository implements LocationsRepository {
  async findByZipCode(zipCode: string): Promise<Location | undefined | null> {
    const { data, error } = await supabase
      .from('locations')
      .select()
      .eq('zip_code', zipCode)

    if (error) {
      console.error(DatabaseError.get(error.message))
    }

    const location = data ? data[0] : null

    return location
      ? Location.instance(
        { zipCode: location.zip_code, ...location },
        location.id
      )
      : null
  }

  async save(location: Location, update?: boolean | undefined): Promise<void> {
    if (update) {
      const { error } = await supabase
        .from('locations')
        .update({ zip_code: location.props.zipCode, ...location.props })
        .eq('id', location.id)
      if (error) console.error(error.message)
    } else {
      const { error } = await supabase.from('locations').insert({
        id: location.id,
        zip_code: location.props.zipCode,
        ...location.props
      })
      if (error) console.error(error.message)
    }
  }
}
