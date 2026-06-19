import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { sermonSchema } from './schemas/sermon'

export default defineConfig({
  name: 'crm-church',
  title: 'CRM Church',
  projectId: 'uuvjpoxk',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [sermonSchema],
  },
})
