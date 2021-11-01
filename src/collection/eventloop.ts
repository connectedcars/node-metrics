import { EventLoopUtilization, IntervalHistogram, monitorEventLoopDelay, performance } from 'perf_hooks'

let histogram: IntervalHistogram

export const enable = (options?: { monitorEventLoopDelayResolution?: number }): void => {
  histogram = monitorEventLoopDelay({ resolution: options?.monitorEventLoopDelayResolution })
  histogram.enable()
}
export const disable = (): void => {
  histogram.disable()
}

// https://nodesource.com/blog/event-loop-utilization-nodejs
// cumulative duration of time the event loop has been both idle and active as a high resolution milliseconds timer, we convert to seconds
export interface Utilization {
  idle: number
  active: number
  utilization: number
}

export interface Delay {
  min: number
  max: number
  mean: number
  stddev: number
  percentile50: number
  percentile90: number
  percentile99: number
}

export interface Metrics {
  delay: Delay
  utilization: Utilization
}

let prevELU: EventLoopUtilization = performance.eventLoopUtilization()
export const collect = (): Metrics => {
  //convert nanoseconds to seconds
  const delay = {
    min: histogram.min / 1e9,
    max: histogram.max / 1e9,
    mean: histogram.mean / 1e9,
    stddev: histogram.stddev / 1e9,
    percentile50: histogram.percentile(95) / 1e9,
    percentile90: histogram.percentile(90) / 1e9,
    percentile99: histogram.percentile(99) / 1e9
  }
  histogram.reset()

  const utilization = performance.eventLoopUtilization(prevELU)
  prevELU = utilization

  //conver miliseconds to seconds
  return {
    delay,
    utilization: {
      idle: utilization.idle / 1000,
      active: utilization.active / 1000,
      utilization: utilization.utilization / 1000
    }
  }
}
