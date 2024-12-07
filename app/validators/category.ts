import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
  })
)
