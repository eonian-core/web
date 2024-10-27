import { initPlasmicLoader } from '@plasmicapp/loader-nextjs/react-server-conditional'

if (!process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID)
  throw new Error('Missing plasmic project ID')

if (!process.env.NEXT_PUBLIC_PLASMIC_TOKEN)
  throw new Error('Missing plasmic token')

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID, // ID of a project you are using
      token: process.env.NEXT_PUBLIC_PLASMIC_TOKEN,
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})
