import type { Article } from '@lib/article/types'
import type { IService } from '@lib/core/interfaces/service'

import ArticleRepository from '../repositories/article'
import ArticleMapper from '../mappers/article'
import type { ArticleInput } from '../repositories/types'

class ArticleService implements IService<ArticleInput, Article> {
  private static instance: ArticleService

  repository: ArticleRepository
  mapper: ArticleMapper

  private constructor() {
    this.repository = new ArticleRepository()
    this.mapper = new ArticleMapper()
  }

  static getInstance() {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService()
    }
    return ArticleService.instance
  }

  async create(article: ArticleInput): Promise<Article> {
    const { data, error } = await this.repository.create(article)
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not create article')
    if (Array.isArray(data)) throw new Error('Data is an array')
    return this.mapper.map(data)
  }

  async update(id: string, data: ArticleInput): Promise<any> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id)
    return result
  }

  async find(id: string): Promise<Article> {
    const { data, error } = await this.repository.find(id)
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not find article')
    if (Array.isArray(data)) throw new Error('Data is an array')
    return this.mapper.map(data)
  }

  async findAll(): Promise<Article[]> {
    const { data, error } = await this.repository.findAll()
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not find articles')
    if (!Array.isArray(data)) throw new Error('Data is not an array')
    return this.mapper.mapArray(data)
  }

  async findBySlug(slug: string): Promise<Article> {
    const { data, error } = await this.repository.findBySlug(slug)
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not find article')
    if (Array.isArray(data)) throw new Error('Data is an array')
    return this.mapper.map(data)
  }

  async findByCriteria(criteria: any): Promise<Article[]> {
    throw new Error('Method not implemented.')
  }
}

export default ArticleService
