import Hypercore from 'hypercore'
import Hyperswarm from 'hyperswarm'
import Corestore from 'corestore'
import goodbye from 'graceful-goodbye'
import b4a from 'b4a'

import { Node } from 'hyperbee/lib/messages.js'

// creation of a corestore instance 
const store = new Corestore('./reader-storage-2')

const swarm = new Hyperswarm()
goodbye(() => swarm.destroy())

// replication of the corestore instance on connection with other peers
swarm.on('connection', conn => store.replicate(conn))

// create or get the hypercore using the public key supplied as command-line argument
const core = store.get({ key: b4a.from(process.argv[2], 'hex') })
// wait till the properties of the hypercore instance are initialized
await core.ready()

const foundPeers = store.findingPeers()
// join a topic
swarm.join(core.discoveryKey)
swarm.flush().then(() => foundPeers())

// update the meta-data information of the hypercore instance
await core.update()

const seq = core.length - 1
const lastBlock = await core.get(core.length - 1)

// print the information about the last block or the latest block of the hypercore instance
console.log(`Raw Block ${seq}:`, lastBlock)
console.log(`Decoded Block ${seq}`, Node.decode(lastBlock))