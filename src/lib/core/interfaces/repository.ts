interface IRepositoryResponse<T> {
  data?: T | T[]
  error?: string
}

interface IRepository<T, V> {
  find: (id: string) => Promise<IRepositoryResponse<V>>
  findAll: () => Promise<IRepositoryResponse<V>>
  create: (data: T) => Promise<IRepositoryResponse<V>>
  update: (id: string, data: any) => Promise<IRepositoryResponse<V>>
  delete: (id: string) => Promise<boolean>
}

export type { IRepository, IRepositoryResponse }
