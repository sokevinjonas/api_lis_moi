import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).maxLength(25),
    description: vine.string().trim().minLength(10),
    cover_image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    hasDigitalVersion: vine.boolean().optional(),
    // url: vine.string(),
    url: vine.file({
      size: '20mb',
      extnames: ['pdf', 'epub'],
    }),
    category_id: vine.number().exists({ table: 'categories', column: 'id' }),
    price: vine.number().optional(),
  })
)
