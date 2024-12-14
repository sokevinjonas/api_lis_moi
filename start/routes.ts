/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import BooksController from '#controllers/books_controller'
import CategoriesController from '#controllers/categories_controller'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { normalize, sep } from 'path'

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/
router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads', normalizedPath)
  console.log('Chemin du fichier :', absolutePath) // Debug
  return response.download(absolutePath)
})

router.get('/', async ({ view }) => {
  return view.render('welcome', { username: 'SO JONAS' })
})

// groupe pour la version 1 de l'api
router
  .group(() => {
    router.resource('/categories', CategoriesController).apiOnly()
    router.resource('/books', BooksController).apiOnly()
  })
  .prefix('api_v1')
