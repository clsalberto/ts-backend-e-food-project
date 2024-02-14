import { Entity } from '../shared/entity'
import { Replace } from '../shared/replace'

export interface SignatureProps {
  storeId: string
  planId: string
  createdAt: Date
}

export class Signature extends Entity<SignatureProps> {
  static instance(
    props: Replace<SignatureProps, { createdAt?: Date }>,
    id?: string
  ): Signature {
    return new Signature(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )
  }
}
