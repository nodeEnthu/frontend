 // this code is initialed when someone is logged in
 import { securedPostCall } from 'utils/httpUtils/apiCallWrapper';

 function initializeOneSignal(appId) {
     let OneSignal = window.OneSignal || [];
     OneSignal.push(["init", {
         appId: appId,
         autoRegister: false,
         welcomeNotification: {
             disable: true
         },
         notifyButton: {
             /* Your other notify button settings here ... */
             enable: true,
             showCredit: false,
             /* Hide the OneSignal logo */
             theme: 'inverse',
             displayPredicate: function() {
                 return OneSignal.isPushNotificationsEnabled()
                     .then(function(isPushEnabled) {
                         return !isPushEnabled;
                     });
             },
             text: {
                 'tip.state.unsubscribed': 'Get notified about the status of your orders etc.',
                 'tip.state.subscribed': "Congrats! you are already subscribed",
                 'dialog.main.title': "Manage notifications"
             }
         }
     }]);
     OneSignal.push(function() {
         OneSignal.on('subscriptionChange', function(isSubscribed) {
             if (isSubscribed === true) {
                 // if the user has subscribed the make a call to front end and add it to backend
                 OneSignal.getUserId(function(userId) {
                     // register the playerId to user in db
                     securedPostCall('/api/device/register', { id: userId });
                 });
             } else {
                 // unsubscribe the user from all the devices that he is registered with
                 securedPostCall('/api/device/deregister', { id: userId });
             }
         });
     });
 }

 export default initializeOneSignal;
