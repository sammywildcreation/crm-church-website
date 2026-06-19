import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'uuvjpoxk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

export type Sermon = {
  _id: string
  title: string
  preacher: string
  date: string
  description?: string
  audioUrl: string
}

const SERMON_FIELDS = `
  _id,
  title,
  preacher,
  date,
  description,
  "audioUrl": audioFile.asset->url
`

export async function getSermons(): Promise<Sermon[]> {
  return client.fetch<Sermon[]>(
    `*[_type == "sermon"] | order(date desc) { ${SERMON_FIELDS} }`
  )
}

export async function getLatestSermon(): Promise<Sermon | null> {
  return client.fetch<Sermon | null>(
    `*[_type == "sermon"] | order(date desc) [0] { ${SERMON_FIELDS} }`
  )
}
