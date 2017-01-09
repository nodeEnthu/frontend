export function onMainPageEnter(nextState,replace,store) {
    let globalState = store.getState();
    const { user,userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && user.published && user.userType === 'provider') {
       replace('/providerProfile/'+user._id);
    } else if(userLoggedIn && user.type === 'consumer'){
    	replace('/search');
    }
}


export function onProviderPageEnter(nextState,replace,store) {
    let globalState = store.getState();
    const { user,userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && user.published && user.userType === 'provider') {
       replace('/providerProfile/'+user._id);
    } 
}