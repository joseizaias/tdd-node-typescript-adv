import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb()
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  // podemos usar ou o backup conforme citado acima, ou usar o afterEach como abaixo (o afterEach está comentado)
  // afterEach(async () => {
  //   await pgUserRepo.clear()
  // })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined if email exists', async () => {
      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })
})
