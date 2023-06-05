const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const userController = require('../controllers/userController')
const { authenticateToken } = require('./middleware');
const User = require('../models/Users');


router.post('/pokemon', authenticateToken, pokemonController.createPokemon);
router.get('/pokemons', authenticateToken, pokemonController.getPokemon);

router.post('/newUser', authenticateToken, userController.createUser);
router.get('/users', authenticateToken, userController.getUser);


router.get('/user', authenticateToken, userController.getUserById);

router.post('/search', authenticateToken, pokemonController.getPokemon);

router.post('/buypokemon', authenticateToken, userController.buyPokemon);

router.post('/sellpokemon', authenticateToken, userController.sellPokemon);

router.post('/savepokemon', authenticateToken, userController.savePokemon);

router.post('/editperfil', authenticateToken, userController.editPerfil);

router.processFriendListMessages = (ws, connectedClients, message) => {

  switch (message.state) {
      case "connected": {
          User.findById(ws.userId, { "friends": 1 })
              .populate("friends", { "_id": 1 })
              .then(userData => {
                  const allFriendsIds = userData.friends.map(f => f._id.toString());
                  const connectedFriends = Object.keys(connectedClients)
                      .filter(friendId => {
                          const isOnline = allFriendsIds.includes(friendId);
                          if (isOnline) {
                              connectedClients[friendId].send(JSON.stringify({ state: "connectedFriend", body: ws.userId }));
                          }
                          return isOnline;
                      });
                  connectedClients[ws.userId]?.send(JSON.stringify({ state: "friendList", body: JSON.stringify(connectedFriends) }));
              });
          break
      }
  }
}

router.processExchangeListMessages = (ws, exchangeClients, message) => {
    switch (message.state){
        case "connected":{
            console.log("Conexion Intercambio", message);
            if (exchangeClients[ws.userId])
                exchangeClients[ws.userId].exchangeData = {pokemonExchange: message.pokemonExchange, name: message.name, trainerAvatar: message.trainerAvatar};

            console.log("All trade clients", Object.values(exchangeClients));

            ws.send(
                JSON.stringify(
                    {
                        state: "exchangeList",
                        body: Object.values(exchangeClients).filter(e => e.userId !== ws.userId).map(e => e.exchangeData)
                    }
                )
            );

            Object.values(exchangeClients).filter(e => e.userId !== ws.userId).forEach(cli => {
                cli.send(JSON.stringify({
                    state: "newExchangeUser",
                    body: exchangeClients[ws.userId].exchangeData
                }))
            })
            break;
        }
        case "exchange" :{

            console.log("Click Intercambio", message, exchangeClients);

            Object.values(exchangeClients).filter(e => e.exchangeData.pokemonExchange._id === message.body.pokemonExchange._id).map(cli =>{
                cli.send(JSON.stringify({
                    state: "requestExchange",
                    body: {
                        name: ws.exchangeData.name,
                        pokemonExchange: ws.exchangeData.pokemonExchange
                    }
                }))
            })




            break
        }
    }
}


module.exports = router;
