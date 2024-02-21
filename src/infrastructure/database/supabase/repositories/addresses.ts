import { AddressesRepository } from '~/application/repositories/addresses'
import { Address } from '~/domain/entities/address'
import { supabase } from '..'
import { DatabaseError } from '~/application/shared/response'

export class SupabaseAddressesRepository implements AddressesRepository {
  async findAddress(
    locationId: string,
    number: string,
    complement: string
  ): Promise<Address> {
    const { data, error } = await supabase
      .from('addresses')
      .select()
      .eq('location_id', locationId)
      .eq('number', number)
      .eq('complement', complement)

    if (error) console.error(DatabaseError.get(error.message))

    const address = data ? data[0] : null

    return address
      ? Address.instance(
        {
          locationId: address.location_id,
          referencePoint: address.reference_point,
          ...address
        },
        address.id
      )
      : null
  }
}
