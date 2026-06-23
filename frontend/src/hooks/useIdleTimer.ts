import { useIdleTimer as useIdleTimerLib } from 'react-idle-timer'

interface UseIdleTimerOptions {
  timeout?: number
  onIdle?: () => void
  onActive?: () => void
}

export function useIdleTimer({
  timeout = 1000 * 60 * 15,
  onIdle,
  onActive
}: UseIdleTimerOptions = {}) {
  return useIdleTimerLib({
    timeout,
    throttle: 500,
    ...(onIdle && { onIdle }),
    ...(onActive && { onActive })
  })
}
