import { Entity } from '../shared/entity'

export interface PlanProps {
  name: string
  description?: string
  value: number
}

export class Plan extends Entity<PlanProps> {
  static instance(props: PlanProps, id?: string): Plan {
    return new Plan({ ...props }, id)
  }
}
