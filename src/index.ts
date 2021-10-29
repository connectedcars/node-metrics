import * as perfHooks from './perf-hooks'
import * as process from './process'

export interface EnableOptions {
  PerfHooks: { monitorEventLoopDelayResolution?: number }
}

export const enable = (options?: EnableOptions): void => {
  perfHooks.enable(options?.PerfHooks)
}

export const disable = (): void => {
  perfHooks.disable()
}

export interface Metrics {
  process: process.ProcessMetrics
  perfHooks: perfHooks.perfHookMetrics
}

export const collect = (): Metrics => {
  return {
    process: process.collect(),
    perfHooks: perfHooks.collect()
  }
}
