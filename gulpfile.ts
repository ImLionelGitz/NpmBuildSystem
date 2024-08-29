import { src, dest, watch, series } from 'gulp';
import * as webpack from 'webpack';
import cfg from './webpack.config'
import * as webpackStream from 'webpack-stream';
import { argv } from 'yargs'
import { rmSync, existsSync } from 'fs'


const args = argv as any
const config: webpack.Configuration = {
    ...cfg,
    mode: args.export? 'production' : 'development'
}

function clean() {
    return new Promise<void>((resolve, _) => {
        if (existsSync('./dist')) {
            rmSync('./dist', { recursive: true, force: true })
        }

        resolve()
    })
}

function copyFiles() {
    return src('./assets/*.*', { encoding: false })
    .pipe(dest('./dist/assets'))
}

function build() {
    return webpackStream(config, webpack)
    .pipe(dest('./dist'))
}

export default async function() {
    await clean()
    copyFiles()
    build()

    if (args.stare) {
        const watcher = watch(['./src/*.ts'])

        watcher.on('change', (file) => {
            const timeobj = new Date()
            const timestr = timeobj.toTimeString()
            const time = timestr.substring(0, 8)

            console.log(`File at ${file} has been updated at ${time}`)
            build()
        })
    }
}