import slugify from 'slugify'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const postById: QueryResolvers['postById'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const postBySlug: QueryResolvers['postBySlug'] = ({ slug }) => {
  return db.post.findUnique({
    where: { slug },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: {
      ...input,
      slug: slugify(input.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      }),
    },
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: {
      ...input,
      slug: slugify(input.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      }),
    },
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}
