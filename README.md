# Holepunch
Examples of peer to peer with [holepunch](https://docs.holepunch.to/).

## 1. Hyperswarm DHT: Connecting Two Peers By Key
[Hyperswarm](https://docs.holepunch.to/building-blocks/hyperswarm) allows multiple peers to connect who are announcing a common topic.  Peers are identified by a public key, not an IP address.  The same peer public keys work between different networks.  
The following is an example of the lower level interface inside hyperswarm, the hyperswarm DHT.   

In a terminal, start the server at /1/server.mjs:  
```
$ node 1/server.mjs
listening on: e592476d8b5d8a7a0278d1d9f5d97aa48b4deb2534f2c81ac7add47ea4d075d4
```

On a second terminal instance, start the client at /1/client.mjs:
```
$ node 1/client.mjs e592476d8b5d8a7a0278d1d9f5d97aa48b4deb2534f2c81ac7add47ea4d075d4
Connecting to: e592476d8b5d8a7a0278d1d9f5d97aa48b4deb2534f2c81ac7add47ea4d075d4
got connection!
```

Once connected, type something in the second terminal:
```
$ node 1/client.mjs e592476d8b5d8a7a0278d1d9f5d97aa48b4deb2534f2c81ac7add47ea4d075d4
Connecting to: e592476d8b5d8a7a0278d1d9f5d97aa48b4deb2534f2c81ac7add47ea4d075d4
got connection!
Hello
```

Go back to the first terminal and you will see the connection message and the input from the second terminal as well:
```
$ node 1/server.mjs
listening on: e592476d8b5d8a7a0278d1d9f5d97aa48b4deb2534f2c81ac7add47ea4d075d4
got connection!
Hello
```

## 2. Hyperswarm - Connecting Many Peers By Topic
Using [Hyperswarm](https://docs.holepunch.to/building-blocks/hyperswarm) provides a higher level interface to manage the connecting and disconnecting of peers within the hyperswarm DHT.  

In a terminal, start the first peer at /2/peer.mjs:  
```
$ node 2/peer.mjs
joined topic: 155c8b340ab95eca5a2bc72a1d2a2befcbe6b2e9a8805f205efb49f497122684
```

In a second terminal, start the second peer with the same file, plus adding the topic provided in the first terminal as an argument:
```
$ node 2/peer.mjs 155c8b340ab95eca5a2bc72a1d2a2befcbe6b2e9a8805f205efb49f497122684
* got a connection from: 3372cbf25288b9fb751055b9e09c0f68160f9bde1e8958bd4237dad9beacd574 *
joined topic: 155c8b340ab95eca5a2bc72a1d2a2befcbe6b2e9a8805f205efb49f497122684
```

Back in the first peer terminal:
```
$ node 2/peer.mjs 
joined topic: 155c8b340ab95eca5a2bc72a1d2a2befcbe6b2e9a8805f205efb49f497122684
* got a connection from: ffe00aca0a63c0e12a2ed8bbc3eab2802472d69e4b7de97c621ddea2223313f3 *
```

One file, same functionality for one or more peers.  
As long as peers are online and connected at the same time, they can exchange chat messages in examples 1 and 2. What's lacking is persistence, provided next by hypercore, to where the messages can be stored locally by the publishing peer while offline, then synced with subscribing peers when connected again over hyperswarm.

## 3. Hypercore - Replicate Single Hypercore
In this example there are two files, writer.mjs and reader.mjs, each with their own terminal.  
The writer takes input from the terminal and persists it in a local directory, /writer-storage, then replicates the data over hyperswarm.  
The reader syncs with the writer hypercore over hyperswarm and persists the data locally to /reader-storage.    

In the writer terminal:
```
$ node 3/writer.mjs
hypercore key: df23c949e4b498af6fa8a84b7e31edb81d85e6420a6b759ba2289978fa270387
```

In the reader terminal:
```
$ node 3/reader.mjs df23c949e4b498af6fa8a84b7e31edb81d85e6420a6b759ba2289978fa270387
Skipping 0 earlier blocks...
```

In the writer terminal, type something and press enter:
```
$ node 3/writer.mjs
hypercore key: df23c949e4b498af6fa8a84b7e31edb81d85e6420a6b759ba2289978fa270387
asdasd
```

In the reader terminal:
```
$ node 3/reader.mjs df23c949e4b498af6fa8a84b7e31edb81d85e6420a6b759ba2289978fa270387
Skipping 0 earlier blocks...
Block 0: asdasd
```

## 4. Corestore - Replicate Multiple Hypercores
A corestore is a way to store and sync multiple hypercores.  
In this example there are two files, writer.mjs and reader.mjs, each with their own terminal.  

In the writer terminal:
```
$ node 4/writer.mjs
main core key: 259008471a3acd890a50463e75b8621827b0657198d951c10a37e592409f546a
```

In the reader terminal:
```
$ node 4/reader.mjs 259008471a3acd890a50463e75b8621827b0657198d951c10a37e592409f546a
```

In the writer terminal, type in 5 or 6 letters and press enter:
```
$ node 4/writer.mjs
main core key: 259008471a3acd890a50463e75b8621827b0657198d951c10a37e592409f546a
asdasd
appending long data to core3
```

In the reader terminal:
```
$ node 4/reader.mjs 259008471a3acd890a50463e75b8621827b0657198d951c10a37e592409f546a
Block 0 in Core 9aa203ef79062648ebc387f1b3f2df659f04b9b235b10d8d36cbf3f9d4821340: asdasd
```

In the writer terminal, type in 2 letters and press enter:
```
$ node 4/writer.mjs
main core key: 259008471a3acd890a50463e75b8621827b0657198d951c10a37e592409f546a
asdasd
appending long data to core3
as
appending short data to core2
```

In the reader terminal:
```
$ node 4/reader.mjs 259008471a3acd890a50463e75b8621827b0657198d951c10a37e592409f546a
Block 0 in Core 9aa203ef79062648ebc387f1b3f2df659f04b9b235b10d8d36cbf3f9d4821340: asdasd

Block 0 in Core 9d20834415b44467b1154aeffc936c1cbec8fba5c2699bdea2cdaf00fc8503d2: as
```