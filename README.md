# Holepunch
Examples of peer to peer with [holepunch](https://docs.holepunch.to/).

## 1. Hyperswarm DHT: Connecting Two Peers By Key
[Hyperswarm](https://docs.holepunch.to/building-blocks/hyperswarm) allows multiple peers to connect who are announcing a common topic.  Peers are identified by a public key, not an IP address.  The same peer public keys work between different networks.  
The following is an example of the lower level interface inside hyperswarm, the hyperswarm DHT.   

In a terminal, start the server at /1/server.mjs (publish):  
```
$ node 1/server.mjs
listening on: e592476d8b5d8a7a0278d1d9f5d97aa48b4deb2534f2c81ac7add47ea4d075d4
```

On a second terminal instance, start the client at /1/client.mjs (subscribe):
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

## 2. Connecting Many Peers By Topic
Using [Hyperswarm](https://docs.holepunch.to/building-blocks/hyperswarm) provides a higher level interface to manage the connecting and disconnecting of peers within the hyperswarm DHT.  

In a terminal, start the first peer at /2/peer.mjs (publish):  
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