import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).maxLength(25),
    description: vine.string().trim().minLength(10),
    cover_image: vine.string().trim(),
    hasDigitalVersion: vine.boolean().optional(),
    url: vine.string(),
    category_id: vine.number().exists({ table: 'categories', column: 'id' }),
    price: vine.number().optional(),
  })
)

export const BookMessages = {
  'title.required': 'Le titre est obligatoire.',
  'title.minLength': 'Le titre doit comporter au moins 3 caractères.',
  'title.maxLength': 'Le titre ne peut pas dépasser 255 caractères.',
  'description.required': 'La description est obligatoire.',
  'description.minLength': 'La description doit comporter au moins 10 caractères.',
  'coverImage.required': 'Une image de couverture est obligatoire.',
  'coverImage.url': "L'image de couverture doit être une URL valide.",
  'categoryId.required': 'Une catégorie est obligatoire.',
  'categoryId.exists': "La catégorie sélectionnée n'existe pas.",
  'price.range': 'Le prix doit être compris entre 0 et 1000.',
}
