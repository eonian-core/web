import type { IContentLoaderProps } from 'react-content-loader'
import ContentLoader from 'react-content-loader'

/**
 * One line skeleton loader
 * More loaders for copy-paste: https://skeletonreact.com/
 */
export const OneLineLoader: React.FC<IContentLoaderProps> = props => (
    <ContentLoader
        speed={2}
        width={60}
        height={30}
        viewBox="0 0 60 30"
        backgroundColor="#b6b6b6"
        foregroundColor="#c9c7c7"
        {...props}
    >
        <rect x="0" y="10" rx="3" ry="3" width="60" height="15" />
    </ContentLoader>
)
