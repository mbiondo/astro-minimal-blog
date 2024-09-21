import type { IService } from '@lib/core/interfaces/service'
import type { CommentInput } from '../repositories/types'
import type { Comment } from '@lib/article/types'
import CommentRepository from '../repositories/comment'
import CommentMapper from '../mappers/comment'

class CommentService implements IService<CommentInput, Comment> {
  private static instance: CommentService

  repository: CommentRepository
  mapper: CommentMapper

  private constructor() {
    this.repository = new CommentRepository()
    this.mapper = new CommentMapper()
  }

  static getInstance() {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService()
    }
    return CommentService.instance
  }

  async create(comment: CommentInput): Promise<Comment> {
    const { data, error } = await this.repository.create(comment)
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not create comment')
    if (Array.isArray(data)) throw new Error('Data is an array')
    return this.mapper.map(data)
  }

  async update(id: string, data: CommentInput): Promise<any> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id)
    return result
  }

  async find(id: string): Promise<Comment> {
    const { data, error } = await this.repository.find(id)
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not find comment')
    if (Array.isArray(data)) throw new Error('Data is an array')
    return this.mapper.map(data)
  }

  async findAll(): Promise<Comment[]> {
    const { data, error } = await this.repository.findAll()
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not find comments')
    if (!Array.isArray(data)) throw new Error('Data is not an array')
    return this.mapper.mapArray(data)
  }

  async findByArticleId(articleId: string): Promise<Comment[]> {
    const { data, error } = await this.repository.findByArticleId(articleId)
    if (error) throw new Error(error)
    if (!data) throw new Error('Could not find comments')
    if (!Array.isArray(data)) throw new Error('Data is not an array')
    return this.mapper.mapArray(data)
  }

  async findBySlug(slug: string): Promise<Comment> {
    throw new Error('Method not implemented')
  }

  async findByCriteria(criteria: any): Promise<Comment[]> {
    throw new Error('Method not implemented')
  }
}

export default CommentService
