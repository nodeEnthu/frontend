export function onMainPageEnter(nextState, replace, store) {
  let globalState = store.getState();
  const { user, userLoggedIn } = globalState.core.toJS();
  // if (userLoggedIn && user.published && user.userType === 'provider') {
  //     replace('/providerProfile/' + user._id);
  // } else if (userLoggedIn && user.type === 'consumer') {
  //     replace('/search');
  // }
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

export function onOrderRouteEnter(nextState, replace, store) {
  let globalState = store.getState();
  const { user, userLoggedIn } = globalState.core.toJS();
  if (!userLoggedIn) {
    // is user is not logged it .. send them to home page
    replace('/');
    // user has access to some on else's profile
  } else if (userLoggedIn && user._id != nextState.params.userId) {

    // redirect to their own profile
    replace('/user/' + user._id + '/order-summary');
  }
}

export function onJobCreateEnter(nextState, replace, store) {
  let globalState = store.getState();
  const { user, userLoggedIn } = globalState.core.toJS();
  if (!userLoggedIn) {
    // is user is not logged it .. send them to home page
    replace('/');
    // user has access to some on else's profile
  } 
}

export function onJobsListEntry(nextState, replace, store){
  let globalState = store.getState();
  const { user, userLoggedIn } = globalState.core.toJS();
  if (!userLoggedIn) {
    // is user is not logged it .. send them to home page
    replace('/login?rdr=/jobs/list');
    // user has access to some on else's profile
  } 
}
export function onJobCreateEntry(nextState, replace, store){
  let globalState = store.getState();
  const { user, userLoggedIn } = globalState.core.toJS();
  if (!userLoggedIn) {
    // is user is not logged it .. send them to home page
    replace('/login?rdr=/job/create');
    // user has access to some on else's profile
  } 
}

export function onJobInviteEntry(nextState, replace, store){
  let globalState = store.getState();
  let currentRoute = nextState.location.pathname;
  const { user, userLoggedIn } = globalState.core.toJS();
  if (!userLoggedIn) {
    // is user is not logged it .. send them to home page
    replace('/login?rdr='+currentRoute);
    // user has access to some on else's profile
  } 
}

export function onJobProposalEntry(nextState, replace, store){
  let globalState = store.getState();
  let currentRoute = nextState.location.pathname;
  const { user, userLoggedIn } = globalState.core.toJS();
  if (!userLoggedIn) {
    // is user is not logged it .. send them to home page
    replace('/login?rdr='+currentRoute);
    // user has access to some on else's profile
  } 
}

export function onJobApplyEntry(nextState, replace, store){
  let globalState = store.getState();
  let currentRoute = nextState.location.pathname;
  const { user, userLoggedIn } = globalState.core.toJS();
  if (!userLoggedIn) {
    // is user is not logged it .. send them to home page
    replace('/login?rdr='+currentRoute);
    // user has access to some on else's profile
  }
}
