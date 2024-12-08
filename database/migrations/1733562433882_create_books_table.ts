import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.text('description').notNullable()
      table.string('cover_image').notNullable() // Lien de la couverture
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE') // Catégorie
      table.boolean('has_digital_version').defaultTo(false) // Version numérique disponible ou non
      table.enum('langage', ['Francais', 'Anglais'])
      table.integer('nbr_page')
      table.text('bio_author')
      table.string('url').nullable() // Lien du fichier numérique
      table.decimal('price', 10, 2).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
