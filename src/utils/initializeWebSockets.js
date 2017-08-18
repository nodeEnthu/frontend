// this code is initialed when someone is logged in
import { getCall } from 'utils/httpUtils/apiCallWrapper';
import Hashids from 'hashids'

function initializeWebSockets(user, dispatch, actions) {
  let hashids = new Hashids();
  let roomName = hashids.encodeHex(user._id);
  ahClient.connect(function(error, details) {
    ahClient.on('connected', function(err) {
      if (!err) {
        // check if the person logged in is a provider .. if yes make a room so that online status is detected
        if (user.userType === 'provider') {
          getCall('/api/chat/setUserOnline', { userId: user._id })
          ahClient.roomAdd(roomName, function(error) {});
        }
        ahClient.on('say', function(messagePayload) {
          //could be two things happening here
          /*
           * a) call from server to join another room .. when a customer clicks on chat icon
           * b) message from a room already joined
           */

          let message;
          try { message = JSON.parse(messagePayload.message); } catch (e) { message = messagePayload.message; }
          // lets tacke case a) first .. which will happen ony for providers
          if (message.serverMessage && message.serverMessage === 'joinroom') {
            ahClient.roomAdd(message.newRoom, function(error) {});
            // make  backend call to add provider to the room
            getCall('/api/chat/joinChat', { roomName: message.newRoom, userId: user._id, avatar: user.img, userName: user.name });
            // show a chat circle from customer
            dispatch(actions.addChatWindow(message));
          }
          // this means its a message between two people where connection is already established
          else{
            dispatch(actions.resetNewMessageFlag(messagePayload.room,true));
            dispatch(actions.addChatMessage(messagePayload.room,message,message.providerAvatar));
          }
        })
      }
    })
  });

}

export default initializeWebSockets;
