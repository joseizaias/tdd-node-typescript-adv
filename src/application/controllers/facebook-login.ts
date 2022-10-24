import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { HttpResponse, badRequest, unauthorized, serverError, ok } from '@/application/helpers'
import { RequiredFieldError } from '@/application/errors'

type HttpRequest = {
  token: string | undefined | null
}

type Model = Error | {
  accessToken: string
}
export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const { token } = httpRequest

      if (token === '' || token === null || token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token as string })

      if (accessToken instanceof AccessToken) {
        return ok({
          accessToken: accessToken.value
        })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
