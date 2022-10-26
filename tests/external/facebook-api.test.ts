import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'EAAJm9bZCJUMwBANJvwPMOXtBpfrc0uLnHTBYkBYdKJFZCjPnNGRX1jV6dz8PwV8p4wFMSvyBqkayIbI3L9D2hYw0Paf68WTo7fjgn3T7sRlZCjZBAQWPYL09WbzprWjdMHVdCRVloHH8KsdDrXYZC53CFjrJh7WqICDLut20RqOZCjWlBPJF1EyxQ2M422eBfJNXXDxknCxQXRJMVDXPnL' })

    expect(fbUser).toEqual({
      facebookId: '111789591725813',
      email: 'izaias_omcwfzv_testes@tfbnw.net',
      name: 'izaias Testes'
    })
  })

  it('should return undefined if token is isvalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'invalid_token' })

    expect(fbUser).toBeUndefined()
  })
})
