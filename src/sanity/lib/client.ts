import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn:false lets Next.js Data Cache own all caching via fetch() options.
  // This means Sanity API is only hit during revalidation windows, not on
  // every request — critical on Sanity's free tier API quota.
  useCdn: false,
})
