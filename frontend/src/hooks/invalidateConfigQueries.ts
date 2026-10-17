import type { QueryClient } from '@tanstack/react-query'

import { configsQuery } from './useConfigs'

const HTTP_LOGS_ENABLED_QUERY_KEY = ['http-logs-enabled'] as const

export async function invalidateConfigQueries(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: configsQuery.queryKey }),
    queryClient.invalidateQueries({ queryKey: HTTP_LOGS_ENABLED_QUERY_KEY }),
  ])
}
