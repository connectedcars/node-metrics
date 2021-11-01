import * as Eventloop from './eventloop'
import * as Memory from './memory'

export interface EnableOptions {
  Eventloop: { monitorEventLoopDelayResolution?: number }
}

export const enable = (options?: EnableOptions): void => {
  Eventloop.enable(options?.Eventloop)
}

export const disable = (): void => {
  Eventloop.disable()
}

export interface Metrics {
  Memory: Memory.Metrics
  Eventloop: Eventloop.Metrics
}

export const collect = (): Metrics => {
  return {
    Memory: Memory.collect(),
    Eventloop: Eventloop.collect()
  }
}
