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
    } else if(!userLoggedIn){
        replace('/');
    } 
}

export function onProviderNotPublish(nextState,replace,store) {
    let globalState = store.getState();
    const { user,userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && !user.published && user._id === nextState.params.id) {
        // this means user clicked on edit profile
       replace('provider/'+ user._id +'/publish');
    } 
}