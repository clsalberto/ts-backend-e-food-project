import { Store } from '~/domain/entities/store'

export interface StoresRepository {
  findByTaxId(taxId: string): Promise<Store>
  save(store: Store, update?: boolean): Promise<void>
}
