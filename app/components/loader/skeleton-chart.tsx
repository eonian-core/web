import type { FC } from 'react'
import type { IContentLoaderProps } from 'react-content-loader'
import ContentLoader from 'react-content-loader'

/**
 * Chart skeleton loader
 * More loaders for copy-paste: https://skeletonreact.com/
 */
export const ChartSkeleton: FC<IContentLoaderProps> = ({
  width = 315,
  height = 128,
  ...props
}) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    viewBox="0 0 40 16"
    backgroundColor="#b6b6b658"
    foregroundColor="#c9c7c7c0"
    {...props}
    >
    <path fill="#444" d="M 22.854 8.99 C 17.137 8.99 16.908 7.99 11.419 7.99 C 4.73 7.99 -0.015 10.99 -0.015 10.99 L -0.015 15.99 L 40.005 15.99 L 40.005 3.99 C 34.288 3.99 28.971 8.99 22.854 8.99 Z"/>

  </ContentLoader>
)
