interface IMapper<T, V> {
  map: (data: T) => V
  mapArray: (data: T[]) => V[]
}

export type { IMapper }
