import type { Tweet } from 'react-tweet/api'
import {
  QuotedTweet,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInReplyTo,
  TweetInfo,
  TweetMedia,
  TweetNotFound,
  TweetSkeleton,
  type TwitterComponents,
  enrichTweet,
} from 'react-tweet'
import { Suspense } from 'react'
import { getTweet } from './get-tweet'

interface Props {
  id: string
}

export default function CustomTweet({ id }: Props) {
  return (
    <Suspense fallback={<TweetSkeleton />}>
      <CustomTweetLoader id={id} />
    </Suspense>
  )
}

async function CustomTweetLoader({ id }: Props) {
  try {
    const tweet = await getTweet(id)
    return tweet ? <TweetComponent tweet={tweet} /> : <TweetNotFound />
  }
  catch (error) {
    return <TweetNotFound error={error} />
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
