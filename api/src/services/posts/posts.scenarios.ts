import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        slug: 'String1006707',
        body: 'String',
        summary: 'String',
        title: 'String',
      },
    },
    two: {
      data: {
        slug: 'String2092575',
        body: 'String',
        summary: 'String',
        title: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
