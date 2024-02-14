import { Plan } from '../../domain/entities/plan'

export interface PlansRepository {
  findById(id: string): Promise<Plan | undefined | null>
  save(plan: Plan): Promise<void>
}
