import type { Tweet } from 'react-tweet/api'
import {
  QuotedTweet,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInReplyTo,
  TweetInfo,
  TweetMedia,
  TweetSkeleton,
  type TwitterComponents,
  enrichTweet,
} from 'react-tweet'
import { getTweet } from './get-tweet'

interface Props {
  id: string
}

export default function CustomTweet({ id }: Props) {
  try {
    const tweet = getTweet(id)

    if (tweet)
      return <TweetComponent tweet={tweet} />

    return <TweetSkeleton />
  }
  catch (error) {
    return <TweetSkeleton />
  }
}

interface TweetComponentProps {
  tweet: Tweet
  components?: TwitterComponents
}

function TweetComponent({ tweet: simpleTweet, components }: TweetComponentProps) {
  const tweet = enrichTweet(simpleTweet)

  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} components={components} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} components={components} /> : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
      <TweetInfo tweet={tweet} />
    </TweetContainer>
  )
}
