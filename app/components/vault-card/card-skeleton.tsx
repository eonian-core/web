import type { FC } from 'react'
import type { IContentLoaderProps } from 'react-content-loader'
import ContentLoader from 'react-content-loader'

const height = 460
const width = 320

export const CardSkeleton: FC<IContentLoaderProps> = props => (
  <ContentLoader
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#b6b6b658"
    foregroundColor="#c9c7c7c0"
    {...props}
    >

    <rect x="0" y="300" rx="3" ry="3" width="190" height="20" />
    <rect x="0" y="270" rx="4" ry="4" width="210" height="20" />
    <rect x="0" y="230" rx="4" ry="4" width="230" height="20" />
    <rect x="0" y="200" rx="4" ry="4" width="250" height="20" />
    <rect x="0" y="150" rx="4" ry="4" width="270" height="30" />
    <rect x="0" y="20" rx="10" ry="10" width="270" height="100" />
  </ContentLoader>
)
