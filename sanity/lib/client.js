import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:
  'skh4W4YtlwX9MVjNeCWgnqz9pD8eXR1FuOcUpZTWhcVwHTYLCRdBpMsy2MtPJegCKbMusbsmmUYnCevJSbOTh8c1bc8WKI3mASIIn5SjDoLAsyhFjQmPcJW1polJX2MmpZi8vXBQWLVM6QKn5rQE3ocbgFOwvoi0o8dH6t40zOBm4uNMprY7'
})
