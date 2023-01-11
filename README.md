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
...