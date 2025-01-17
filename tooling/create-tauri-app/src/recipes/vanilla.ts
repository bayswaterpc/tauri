// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

import { join } from 'path'
// @ts-expect-error
import scaffe from 'scaffe'
import { Recipe } from '../types/recipe'

export const vanillajs: Recipe = {
  descriptiveName: {
    name: 'Vanilla.js (html, css, and js without the bundlers)',
    value: 'Vanilla.js'
  },
  shortName: 'vanillajs',
  configUpdate: ({ cfg }) => ({
    ...cfg,
    distDir: `../dist`,
    devPath: `../dist`,
    beforeDevCommand: '',
    beforeBuildCommand: ''
  }),
  extraNpmDevDependencies: [],
  extraNpmDependencies: [],
  preInit: async ({ cwd, cfg }) => {
    const { appName } = cfg
    const templateDir = join(__dirname, '../src/templates/vanilla')
    const variables = {
      name: appName
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      await scaffe.generate(templateDir, join(cwd, appName), {
        overwrite: true,
        variables
      })
    } catch (err) {
      console.log(err)
    }
  },
  postInit: async ({ cfg, packageManager }) => {
    console.log(`
    Your installation completed.

    $ cd ${cfg.appName}
    $ ${packageManager} install
    $ ${packageManager === 'npm' ? 'npm run' : packageManager} tauri dev
    `)
    return await Promise.resolve()
  }
}
