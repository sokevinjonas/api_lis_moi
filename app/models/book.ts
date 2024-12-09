import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare cover_image: string

  @column()
  declare has_digital_version: boolean

  @column()
  declare url: string | null

  @column()
  declare langage: string

  @column()
  declare nbr_page: number

  @column()
  declare bio_author: string

  @column()
  declare author: string

  @column()
  declare price: number | null

  @column()
  declare categoryId: number

  @belongsTo(() => Category)
  declare category_id: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
