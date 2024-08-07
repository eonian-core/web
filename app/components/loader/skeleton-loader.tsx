import type { FC } from 'react'
import type { IContentLoaderProps } from 'react-content-loader'
import ContentLoader from 'react-content-loader'

/**
 * One line skeleton loader
 * More loaders for copy-paste: https://skeletonreact.com/
 */
export const OneLineSkeleton: FC<IContentLoaderProps & { marginTop?: number; marginBottom?: number }> = ({
  marginTop = 10,
  marginBottom = 5,
  width = 60,
  height = 30,
  ...props
}) => (
    <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor="#b6b6b658"
        foregroundColor="#c9c7c7c0"
        {...props}
    >
        <rect x="0" y={marginTop} rx="3" ry="3" width={width} height={(+height) - marginTop - marginBottom} />
    </ContentLoader>
)

export const CircleSkeleton: FC<IContentLoaderProps> = ({ width = 40, height = 40, ...props }) => {
  return (
        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox="0 0 40 40"
            backgroundColor="#b6b6b658"
            foregroundColor="#c9c7c7c0"
            {...props}
        >
            <circle cx="20" cy="20" r="20" />
        </ContentLoader>
  )
}
