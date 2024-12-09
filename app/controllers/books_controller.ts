import Book from '#models/book'
import { createBookValidator } from '#validators/book'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class BooksController {
  /**
   * Display a list of resource
   */
  public baseUrl = 'http://localhost:3333' // en test

  async index({ response }: HttpContext) {
    try {
      const books = await Book.query().preload('category_id')
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
      console.log(data)

      const coverImage = data.cover_image
      const url = data.url

      let coverImageName: string = ''
      let urlName: string = ''

      if (coverImage && url) {
        // Generate a unique file name and move the file
        coverImageName = `${cuid()}.${coverImage.extname}`
        await coverImage.move(app.makePath('uploads/cover'), {
          name: coverImageName,
        })
        urlName = `${cuid()}.${url.extname}`
        await url.move(app.makePath('uploads/books'), {
          name: urlName,
        })
      }

      const bookData = {
        ...data,
        cover_image: `${this.baseUrl}/uploads/cover/${coverImageName}`,
        url: `${this.baseUrl}/uploads/books/${urlName}`,
      }

      const book = await Book.create(bookData)

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
  async show({ params, response }: HttpContext) {
    try {
      // const book = await Book.find(params.id)
      const book = await Book.query().where('id', params.id).preload('category_id')
      if (!book) {
        return response.status(404).json({
          success: false,
          message: 'Livre non trouvée',
        })
      }

      return response.status(200).json({
        success: true,
        data: book,
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
  async destroy({ params, response }: HttpContext) {
    try {
      const book = await Book.find(params.id)
      if (!book) {
        return response.status(404).json({
          success: false,
          message: 'Livre non trouvée',
        })
      }
      await book.delete()
      return response.status(404).json({
        success: true,
        message: 'Livre supprimée avec succès',
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Une erreur est survenue',
        error: error.message,
      })
    }
  }
}
