import AsyncStorage from '@react-native-async-storage/async-storage';
export default class LocalStorage {
    static localStorageInstance = LocalStorage.localStorageInstance == null ? new LocalStorage() : this.localStorageInstance;
    storeData = async (type,value) => {
        try {
            await AsyncStorage.setItem(type,JSON.stringify(value));
        } catch (error) {
            // console.log("error>>>  ",error)
        }
    }
     getData= async (type)=> {
        try {
            const value = await AsyncStorage.getItem(type);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            // console.log("error>>>  ",error)
        }
    }
    removeData= async (type) => {
        try {
            const value = await AsyncStorage.removeItem(type);
            return value;
        } catch(error) {
        }
    }
    async clearAll() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            // console.log("error>>>  ",error)
        }
    }
}