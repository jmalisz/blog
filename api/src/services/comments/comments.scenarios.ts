import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        body: 'String',
        name: 'String',
        post: {
          create: {
            slug: 'String1965823',
            body: 'String',
            summary: 'String',
            title: 'String',
          },
        },
      },
    },
    two: {
      data: {
        body: 'String',
        name: 'String',
        post: {
          create: {
            slug: 'String6603381',
            body: 'String',
            summary: 'String',
            title: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
