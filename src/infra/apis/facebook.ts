import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { HttpGetClient } from '@/infra/http'

export class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'

  constructor (
    private readonly httpCLient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    const appToken = await this.httpCLient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })

    await this.httpCLient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token, // token to servidor - token da empresa
        input_token: params.token
      }
    })
  }
}
