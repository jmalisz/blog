import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        slug: 'String6120222',
        body: 'String',
        summary: 'String',
        title: 'String',
      },
    },
    two: {
      data: {
        slug: 'String1550278',
        body: 'String',
        summary: 'String',
        title: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
