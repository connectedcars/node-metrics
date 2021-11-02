import { getMetricRegistry } from '@connectedcars/logutil'

import { collect, disable, enable, EnableOptions } from './collection'

let loginterval: NodeJS.Timer

export const logNodeMetrics = (serviceName: string, interval = 5000, delay?: number, options?: EnableOptions): void => {
  if (!serviceName || typeof serviceName !== 'string') {
    throw new Error('serviceName is required')
  }

  enable(options)
  const metricRegistry = getMetricRegistry(delay)
  loginterval = setInterval(() => {
    const collectedMetrics = collect()
    metricRegistry.gauge(`${serviceName}/node/process-memory-heapTotal`, collectedMetrics.Memory.heapTotal)
    metricRegistry.gauge(`${serviceName}/node/process-memory-heapUsed`, collectedMetrics.Memory.heapUsed)
    metricRegistry.gauge(`${serviceName}/node/process-memory-external`, collectedMetrics.Memory.external)
    metricRegistry.gauge(`${serviceName}/node/process-memory-rss`, collectedMetrics.Memory.rss)
    metricRegistry.gauge(`${serviceName}/node/process-memory-arrayBuffers`, collectedMetrics.Memory.arrayBuffers)
    metricRegistry.gauge(`${serviceName}/node/eventloop-utilization-idle`, collectedMetrics.Eventloop.utilization.idle)
    metricRegistry.gauge(
      `${serviceName}/node/eventloop-utilization-active`,
      collectedMetrics.Eventloop.utilization.active
    )
    metricRegistry.gauge(
      `${serviceName}/node/eventloop-utilization-utilization`,
      collectedMetrics.Eventloop.utilization.utilization
    )
    metricRegistry.gauge(`${serviceName}/node/eventloop-delay-min`, collectedMetrics.Eventloop.delay.min)
    metricRegistry.gauge(`${serviceName}/node/eventloop-delay-max`, collectedMetrics.Eventloop.delay.max)
    metricRegistry.gauge(`${serviceName}/node/eventloop-delay-mean`, collectedMetrics.Eventloop.delay.mean)
    metricRegistry.gauge(`${serviceName}/node/eventloop-delay-stddev`, collectedMetrics.Eventloop.delay.stddev)
    metricRegistry.gauge(
      `${serviceName}/node/eventloop-delay-percentile50`,
      collectedMetrics.Eventloop.delay.percentile50
    )
    metricRegistry.gauge(
      `${serviceName}/node/eventloop-delay-percentile90`,
      collectedMetrics.Eventloop.delay.percentile90
    )
    metricRegistry.gauge(
      `${serviceName}/node/eventloop-delay-percentile99`,
      collectedMetrics.Eventloop.delay.percentile99
    )
  }, interval)
}

export const stopLoggingMetrics = (): void => {
  disable()
  clearInterval(loginterval)
}
