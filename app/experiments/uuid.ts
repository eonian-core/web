import { cache } from 'react'
import { uuidv7 } from 'uuidv7'

export const generateUuid = cache(() => {
  const id = uuidv7()
  return id
})
