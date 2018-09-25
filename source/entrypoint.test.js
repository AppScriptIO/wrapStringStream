// import assert from 'assert'
import path from 'path'
import { assert } from 'chai'
import stream from 'stream'
const DuplexStream = stream.Duplex
import filesystem from 'fs'
import deleteModule from 'del'
import configuration from '../setup/configuration'
import { wrapStringStream } from './entrypoint.js'
const isStream = stream => !!(typeof stream === 'object' && typeof stream.pipe === 'function') // check if a stream

const testAssetPath = path.join(configuration.directory.application.containerAbsolutePath, 'test/asset')


describe('function wrapStringStream: ', function() {
    describe('Surround a stream with strings', function() {
        const beforeString = 'before',
              afterString = 'after', 
              streamData = 'data'
        it('Should return a string with delimiters added', async function() {
            let streamVariable = new DuplexStream()
            let wrappedStream = await wrapStringStream(streamVariable, beforeString, afterString)
            streamVariable.push(streamData)
            streamVariable.push(null)
            assert.isOk(isStream(wrappedStream))
            assert.equal(wrappedStream.toString(), streamVariable.toString())
        })
    })
})
