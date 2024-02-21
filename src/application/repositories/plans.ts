import { Plan } from '~/domain/entities/plan'

export interface PlansRepository {
  findById(id: string): Promise<Plan | undefined>
  save(plan: Plan, update?: boolean): Promise<void>
}
