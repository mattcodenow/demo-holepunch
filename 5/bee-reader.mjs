import Hyperswarm from 'hyperswarm'
import Corestore from 'corestore'
import Hyperbee from 'hyperbee'
import goodbye from 'graceful-goodbye'
import b4a from 'b4a'

// creation of a corestore instance 
const store = new Corestore('./reader-storage')

const swarm = new Hyperswarm()
goodbye(() => swarm.destroy())

// replication of the corestore instance on connection with other peers
swarm.on('connection', conn => store.replicate(conn))

// create or get the hypercore using the public key supplied as command-line argument
const core = store.get({ key: b4a.from(process.argv[2], 'hex') })

// create a hyperbee instance using the hypercore instance
const bee = new Hyperbee(core, {
  keyEncoding: 'utf-8',
  valueEncoding: 'utf-8'
})

// wait till the hypercore properties to be intialized
await core.ready()

// logging the public key of the hypercore instance
console.log('core key here is:', core.key.toString('hex'))

// Attempt to connect to peers
swarm.join(core.discoveryKey)

// Do a single Hyperbee.get for every line of stdin data
// Each `get` will only download the blocks necessary to satisfy the query
process.stdin.setEncoding('utf-8')
process.stdin.on('data', data => {
  const word = data.trim()
  if (!word.length) return
  bee.get(word).then(node => {
    if (!node || !node.value) console.log(`No dictionary entry for ${data}`)
    else console.log(`${data} -> ${node.value}`)
  }, err => console.error(err))
})