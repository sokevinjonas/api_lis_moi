import Book from '#models/book'
import { createBookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const books = await Book.all()
      return response.status(200).json({
        sucess: true,
        data: books,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Une erreur est survenue',
        error: error.message,
      })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createBookValidator)

      const book = await Book.create(data)

      return response.status(200).json({
        message: 'Livre créé avec succès.',
        data: book,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Une erreur est survenue lors de la création du livre',
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
