import { afterEach, describe, expect, it, vi } from 'vitest'

import { QueryClient, QueryObserver } from '@tanstack/react-query'

import { invalidateConfigQueries } from './invalidateConfigQueries'

const httpLogsEnabledQueryKey = ['http-logs-enabled', 7] as const

describe('invalidateConfigQueries', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('refreshes the HTTP logs flag after a config import or sync', async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    let enabled = false
    let fetches = 0
    const observer = new QueryObserver(client, {
      queryKey: httpLogsEnabledQueryKey,
      queryFn: async () => {
        fetches += 1

        return enabled
      },
    })
    const unsubscribe = observer.subscribe(() => undefined)

    await observer.refetch()
    expect(client.getQueryData(httpLogsEnabledQueryKey)).toBe(false)

    enabled = true
    await invalidateConfigQueries(client)

    expect(client.getQueryData(httpLogsEnabledQueryKey)).toBe(true)
    expect(fetches).toBe(2)
    unsubscribe()
  })
})
