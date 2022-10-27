import './config/module-alias'

import 'reflect-metadata'

import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
