import rehypeExternalLinks from 'rehype-external-links'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adds mdx support
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issue-1559239983
    config.externals.push('pino-pretty', 'lokijs')

    // https://github.com/vercel/next.js/issues/44273
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })

    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: { fs: false, path: false },
      }
    }

    return config
  },
  // Build source maps only if LogRocket is enabled
  productionBrowserSourceMaps: !!process.env.LOGROCKET_API_KEY,

  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },

  images: {
    // Used for `JoinOthers` component
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],

    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank', // open in new tab
          rel: 'noopener noreferrer', // prenect tabnabbing <https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/>
        },
      ],
    ],

    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX(nextConfig)
