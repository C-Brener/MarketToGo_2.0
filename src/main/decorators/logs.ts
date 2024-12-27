import type { LogsErrorRepository } from '../../data/protocols/logs-error-repository'
import type { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LoggerControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogsErrorRepository

  constructor (controller: Controller, logError: LogsErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logError
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack as string)
    }
    return httpResponse
  }
}
