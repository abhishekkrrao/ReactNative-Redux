/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './Redux/Store';
import AppNavigator from './Navigator/AppNavigator';
import { authSaga } from './Redux/Saga';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const middleware = [];
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middleware));
const createAppropriateStore = createStore;
export const store = createAppropriateStore(rootReducer, composeWithDevTools(...enhancers));
sagaMiddleware.run(authSaga);

function App() {

    // useEffect(()=>{

    //     MaterialCommunityIcon.loadFont().then(()=>{}).catch((res)=>{
    //         console.log(res)
    //     }); 


    // },[])

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>
    );
}
export default App;
