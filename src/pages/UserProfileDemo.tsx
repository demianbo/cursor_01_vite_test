import { useState } from 'react'
import { UserProfile } from '@/components'
import type { UserProfileProps } from '@/components'

const sampleProfiles: Array<{
  user: UserProfileProps['user']
  stats: UserProfileProps['stats']
  variant: 'other' | 'own'
}> = [
  {
    user: {
      id: '1',
      name: 'Alex Johnson',
      username: 'alexj',
      bio: 'Product designer & coffee enthusiast. Building things that make people smile.',
      avatarUrl: 'https://i.pravatar.cc/256?img=12',
      coverImageUrl:
        'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop',
    },
    stats: { followers: 12500, following: 342, posts: 89 },
    variant: 'other',
  },
  {
    user: {
      id: '2',
      name: 'Sam Chen',
      username: 'samchen',
      bio: 'Full-stack developer. Open source contributor. Always learning.',
      avatarUrl: 'https://i.pravatar.cc/256?img=33',
      coverImageUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=200&fit=crop',
    },
    stats: { followers: 2340, following: 156, posts: 412 },
    variant: 'other',
  },
  {
    user: {
      id: '3',
      name: 'Jordan Taylor',
      username: 'jordant',
      bio: null,
      avatarUrl: 'https://i.pravatar.cc/256?img=47',
    },
    stats: { followers: 2_500_000, following: 12, posts: 156 },
    variant: 'other',
  },
  {
    user: {
      id: '4',
      name: 'Riley Martinez',
      username: 'rileym',
      bio: 'Photographer. Traveler. Capturing moments one frame at a time.',
      avatarUrl: 'https://i.pravatar.cc/256?img=65',
      coverImageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop',
    },
    stats: { followers: 892, following: 234, posts: 67 },
    variant: 'other',
  },
  {
    user: {
      id: '5',
      name: 'You',
      username: 'you',
      bio: 'Your own profile. Click Edit profile to customize your bio and settings.',
      avatarUrl: 'https://i.pravatar.cc/256?img=68',
      coverImageUrl:
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
    },
    stats: { followers: 156, following: 89, posts: 23 },
    variant: 'own',
  },
]

export function UserProfileDemo() {
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set(['2']))

  const toggleFollow = (id: string) => {
    setFollowingIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            UserProfile Component Showcase
          </h1>
          <p className="mt-2 text-gray-600">
            Different user profiles demonstrating avatar, bio, stats, and action
            buttons.
          </p>
        </header>

        <div className="space-y-10">
          {sampleProfiles.map(({ user, stats, variant }) => (
            <section key={user.id}>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
                {variant === 'own' ? 'Own profile' : `@${user.username}`}
              </h2>
              <UserProfile
                user={user}
                stats={stats}
                isOwnProfile={variant === 'own'}
                isFollowing={followingIds.has(user.id)}
                onFollow={
                  variant === 'other'
                    ? () => toggleFollow(user.id)
                    : undefined
                }
                onMessage={
                  variant === 'other'
                    ? () => alert(`Message ${user.name}`)
                    : undefined
                }
                onEditProfile={
                  variant === 'own'
                    ? () => alert('Edit profile clicked')
                    : undefined
                }
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
