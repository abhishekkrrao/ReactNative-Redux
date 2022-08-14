/* eslint-disable prettier/prettier */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './Redux/Store';
import AppNavigator from './Navigator/AppNavigator';
import { authSaga } from './Redux/Saga';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './Util';
const middleware = [];
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middleware));
const createAppropriateStore = createStore;
export const store = createAppropriateStore(rootReducer, composeWithDevTools(...enhancers));
sagaMiddleware.run(authSaga);

function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>
    );
}
export default App;
