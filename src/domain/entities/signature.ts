import { Entity } from '../shared/entity'

export interface SignatureProps {
  storeId: string
  planId: string
  createdAt: Date
}

export class Signature extends Entity<SignatureProps> {
  static instance(props: SignatureProps, id?: string): Signature {
    return new Signature({ ...props }, id)
  }
}
