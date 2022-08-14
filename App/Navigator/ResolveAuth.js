import React, { useEffect } from 'react';
import { LocalStorage } from "../Util";
const ResolveAuthScreen = (props) => {
    const [isSignedIn, setIslogin] = useState(false);
    const [initialRoute, setInitialRoute] = useState('');

    const checkAuth = () => {
        LocalStorage.localStorageInstance.getData("user")
            .then((value) => {
                if (value != null) {
                    setIslogin(value.islogin);
                    if (!value.islogin) {
                        props.navigation.navigate('LoginPage');
                    } else {
                        props.navigation.navigate('HomeScreen');
                    }
                }
            }).catch(()=>{  props.navigation.navigate('LoginPage') });
    }

    useEffect(() => {
        checkAuth();
    }, [isSignedIn])

    return null;
}
export default ResolveAuthScreen;