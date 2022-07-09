import { format } from 'date-fns'

export const formatDate = (date: Date) => format(date, 'MMMM d, y')
