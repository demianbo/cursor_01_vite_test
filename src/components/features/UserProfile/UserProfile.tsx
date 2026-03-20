import { Button } from '@/components'

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

export interface UserProfileProps {
  user: {
    id: string
    name: string
    username: string
    bio: string | null
    avatarUrl: string
    coverImageUrl?: string
  }
  stats: {
    followers: number
    following: number
    posts: number
  }
  isOwnProfile?: boolean
  isFollowing?: boolean
  onFollow?: () => void
  onMessage?: () => void
  onEditProfile?: () => void
}

export function UserProfile({
  user,
  stats,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onMessage,
  onEditProfile,
}: UserProfileProps) {
  return (
    <section
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      aria-labelledby="profile-name"
    >
      {user.coverImageUrl && (
        <div
          className="h-24 bg-gray-200 sm:h-32"
          aria-hidden="true"
        >
          <img
            src={user.coverImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col items-center px-4 pb-6 pt-6 text-center md:flex-row md:items-start md:gap-6 md:px-6 md:text-left">
        <div className="-mt-12 sm:-mt-16">
          <img
            src={user.avatarUrl}
            alt={`${user.name}'s profile picture`}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-white md:h-28 md:w-28 lg:h-32 lg:w-32"
            width={128}
            height={128}
          />
        </div>

        <div className="mt-4 flex flex-1 flex-col md:mt-0">
          <h2
            id="profile-name"
            className="text-xl font-semibold text-gray-900 sm:text-2xl"
          >
            {user.name}
          </h2>
          <p className="mt-0.5 text-gray-500">@{user.username}</p>

          {user.bio && (
            <p className="mt-3 max-w-md text-gray-600">{user.bio}</p>
          )}

          <dl
            className="mt-4 flex flex-wrap justify-center gap-6 md:justify-start"
            aria-label="Profile statistics"
          >
            <div className="flex flex-col items-center md:items-start">
              <dt className="sr-only">Posts</dt>
              <dd className="text-lg font-semibold text-gray-900">
                {formatCount(stats.posts)}
              </dd>
              <dd className="text-sm text-gray-500">posts</dd>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <dt className="sr-only">Followers</dt>
              <dd className="text-lg font-semibold text-gray-900">
                {formatCount(stats.followers)}
              </dd>
              <dd className="text-sm text-gray-500">followers</dd>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <dt className="sr-only">Following</dt>
              <dd className="text-lg font-semibold text-gray-900">
                {formatCount(stats.following)}
              </dd>
              <dd className="text-sm text-gray-500">following</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 md:justify-start">
            {isOwnProfile ? (
              <Button
                variant="outline"
                onClick={onEditProfile}
                className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Edit profile
              </Button>
            ) : (
              <>
                <Button
                  variant={isFollowing ? 'secondary' : 'primary'}
                  onClick={onFollow}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button
                  variant="outline"
                  onClick={onMessage}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Message
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
