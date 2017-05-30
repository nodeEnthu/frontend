export function onMainPageEnter(nextState, replace, store) {
    let globalState = store.getState();
    const { user, userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && user.published && user.userType === 'provider') {
        replace('/providerProfile/' + user._id);
    } else if (userLoggedIn && user.type === 'consumer') {
        replace('/search');
    }
}


export function onProviderProfileEntry(nextState, replace, store) {
    let globalState = store.getState();
    const { user, userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && user.published && user.userType === 'provider') {
        replace('/providerProfile/' + user._id);
    } else if (!userLoggedIn) {
        replace('/');
    } else if (userLoggedIn && !user.published && (user.foodItemAddedInEntryMode || (user.foodItems && user.foodItems.length > 0))) {
        replace('/provider/' + user._id + '/publish');
    }
}

export function onProviderFoodEntry(nextState, replace, store) {
    let globalState = store.getState();
    const { user, userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && user.published && user.userType === 'provider') {
        replace('/providerProfile/' + user._id);
    } else if (!userLoggedIn) {
        replace('/');
    } 
}

export function onProviderPublish(nextState, replace, store) {
    let globalState = store.getState();
    const { user, userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && user.published && user.userType === 'provider') {
        replace('/providerProfile/' + user._id);
    } else if (!userLoggedIn) {
        replace('/');
    } else if (userLoggedIn && !user.published && !(user.foodItemAddedInEntryMode || (user.foodItems && user.foodItems.length > 0))) {
        replace('/provider/' + user._id + '/providerProfileEntry');
    }
}
export function onProviderNotPublish(nextState, replace, store) {
    let globalState = store.getState();
    const { user, userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn && !user.published && user._id === nextState.params.id) {
        // this means user clicked on edit profile
        replace('/provider/' + user._id + '/publish');
    }
}
