import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).maxLength(150),
    description: vine.string().trim().minLength(10),
    author: vine.string().trim().minLength(3),
    cover_image: vine.file({
      size: '6mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    hasDigitalVersion: vine.boolean().optional(),
    url: vine.file({
      size: '12mb',
      extnames: ['pdf', 'Pdf'],
    }),
    nbr_page: vine.number(),
    bio_author: vine.string().trim().minLength(25).maxLength(250),
    langage: vine.enum(['Francais', 'Anglais']),
    category_id: vine.number().exists({ table: 'categories', column: 'id' }),
    price: vine.number().optional(),
  })
)
