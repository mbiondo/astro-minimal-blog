import type { IMapper } from './mapper'
import type { IRepository } from './repository'

interface IService<T, V> {
  repository: IRepository<any, any>
  mapper: IMapper<any, any>

  create: (data: T) => Promise<V>
  update: (id: string, data: T) => Promise<V>
  delete: (id: string) => Promise<boolean>
  find: (id: string) => Promise<V>
  findAll: () => Promise<V[]>
  findBySlug: (slug: string) => Promise<V>
  findByCriteria: (criteria: any) => Promise<V[]>
}

export type { IService }
