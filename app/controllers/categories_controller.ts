import Category from '#models/category'
import { createPostValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      // Récupérer toutes les catégories
      const categories = await Category.all()

      // Retourner les données sous forme de JSON
      return response.status(200).json({
        success: true,
        data: categories,
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
  async show({ params, response }: HttpContext) {
    try {
      // Récupérer la catégorie par ID
      const category = await Category.find(params.id)

      if (!category) {
        return response.status(404).json({
          success: false,
          message: 'Catégorie non trouvée',
        })
      }

      return response.status(200).json({
        success: true,
        data: category,
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
  async update({ params, request, response }: HttpContext) {
    try {
      // Récupérer la catégorie par ID
      const category = await Category.find(params.id)

      if (!category) {
        return response.status(404).json({
          success: false,
          message: 'Catégorie non trouvée',
        })
      }

      // Mettre à jour les champs
      const data = request.only(['name', 'description']) // Ajustez les champs selon votre table
      category.merge(data)
      await category.save()

      return response.status(200).json({
        success: true,
        message: 'Catégorie mise à jour avec succès',
        data: category,
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
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      // Récupérer la catégorie par ID
      const category = await Category.find(params.id)

      if (!category) {
        return response.status(404).json({
          success: false,
          message: 'Catégorie non trouvée',
        })
      }

      // Supprimer la catégorie
      await category.delete()

      return response.status(200).json({
        success: true,
        message: 'Catégorie supprimée avec succès',
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
