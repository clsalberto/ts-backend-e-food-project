import { Store } from '~/domain/entities/store'

export interface StoresRepository {
  findById(id: string): Promise<Store>
  findByTaxId(taxId: string): Promise<Store>
  save(store: Store, update?: boolean): Promise<void>
}
