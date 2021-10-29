// https://nodejs.org/api/process.html#processmemoryusage
// https://nodejs.org/api/process.html#processcpuusagepreviousvalue
// https://nodejs.org/api/process.html#processresourceusage
// https://nodejs.org/dist/latest-v14.x/docs/api/perf_hooks.html#perf_hooks_performance_eventlooputilization_utilization1_utilization2
// https://www.cloudbees.com/blog/understanding-garbage-collection-in-node-js

const BYTES_PER_MEGA_BYTE = 2 ** 20

export interface Metrics {
  heapTotal: number // Total memory available to V8
  heapUsed: number // Used by V8
  external: number // Refers to the memory usage of C++ objects bound to JavaScript objects managed by V8.
  rss: number // Resident Set Size, is the amount of space occupied in the main memory device(that is a subset of the total allocated memory) for the process, including all C++ and JavaScript objects and code.
  arrayBuffers: number // Refers to memory allocated for ArrayBuffers and SharedArrayBuffers, including all Node.js Buffers.This is also included in the external value.When Node.js is used as an embedded library, this value may be 0 because allocations for ArrayBuffers may not be tracked in that case.
}

export const collect = (): Metrics => {
  const mem = process.memoryUsage() // v8.getHeapSpaceStatistics would also be an option

  return {
    heapTotal: mem.heapTotal / BYTES_PER_MEGA_BYTE,
    heapUsed: mem.heapUsed / BYTES_PER_MEGA_BYTE,
    external: mem.external / BYTES_PER_MEGA_BYTE,
    rss: mem.rss / BYTES_PER_MEGA_BYTE,
    arrayBuffers: mem.arrayBuffers / BYTES_PER_MEGA_BYTE
  }
}
