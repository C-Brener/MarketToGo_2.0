export interface LogsErrorRepository {
  logError: (stack: string) => Promise<void>
}
