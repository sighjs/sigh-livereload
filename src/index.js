import { mapEvents } from 'sigh-core/lib/stream'
import _ from 'lodash'
import Promise from 'bluebird'
import tinylr from 'tiny-lr'
import request from 'superagent'

import { Bacon } from 'sigh-core'

require('superagent-as-promised')(request)

function onEvents(opts, events) {
  var files = _.pluck(events, 'path')

  return Bacon.fromPromise(
    request.post('http://localhost:' + opts.port + '/changed')
    .send({ files })
    .then(() => events)
  )
}

function startLrServer(opts) {
  return new Promise(resolve => {
    var server = tinylr()
    server.listen(opts.port, () => resolve(server))
  })
}

export default function(op, opts = {}) {
  if (! op.watch)
    return op.stream

  opts.port = opts.port || 35729

  return startLrServer(opts).then(
    lrServer => op.stream.flatMap(onEvents.bind(null, opts))
  )
}
