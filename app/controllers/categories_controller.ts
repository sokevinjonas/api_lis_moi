import Category from '#models/category'
import { createPostValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ response, request }: HttpContext) {
    try {
      // Validation des données
      const { name } = await request.validateUsing(createPostValidator)

      // Création de la catégorie
      const category = await Category.create({ name })

      // Réponse avec succès
      return response.status(201).json({
        message: 'Catégorie créée avec succès',
        data: category,
      })
    } catch (error) {
      // Gestion des erreurs (validation ou autre)
      return response.status(400).json({
        message: 'Une erreur est survenue lors de la création de la catégorie',
        error: error.message,
      })
    }
  }

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  // async destroy({ params }: HttpContext) {}
}
