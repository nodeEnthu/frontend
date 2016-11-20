export function onMainPageEnter(nextState,replace,store) {
    let globalState = store.getState();
    const { user,userLoggedIn } = globalState.core.toJS();
    if (userLoggedIn) {
       replace('/search');
    }
}
