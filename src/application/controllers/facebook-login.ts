import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { HttpResponse, badRequest, unauthorized, serverError } from '@/application/helpers'
import { RequiredFieldError } from '@/application/errors'

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const { token } = httpRequest

      if (token === '' || token === null || token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })

      if (accessToken instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value
          }
        }
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
