import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).maxLength(25),
    description: vine.string().trim().minLength(10),
    cover_image: vine.string(),
    hasDigitalVersion: vine.boolean().optional(),
    url: vine.string(),
    category_id: vine.number().exists({ table: 'categories', column: 'id' }),
    price: vine.number().optional(),
  })
)
