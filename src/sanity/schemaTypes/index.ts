import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { trainingType } from './trainingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, trainingType],
}
