const BYPASS_CHECK_FOR_REACHABILITY = false;
class NetworkManager {
    static networkManagerInstance = NetworkManager.networkManagerInstance == null ? new NetworkManager() : this.networkManagerInstance;
    async fetchRequest(api, method, parameters = {}, token = null) {
        let headers = {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };
        if (token != null) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        let url = api;
        if (!api) {
            return;
        }
        let timeout = 1000 * 60 * 0.5;
        let body = method == 'GET' ? null : method == 'DELETE' ? null : method == 'PUT' ? parameters : JSON.stringify(parameters);
        if (__DEV__) {
            // console.log("body======", url, body)
        }
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });
    }
    async fetchMultiPartRequest(api, method, body, isXMLHttpRequest = false, token = null) {
        let headers = {
            "Accept": 'application/json',
            'Content-Type': 'multipart/form-data',
        }
        if (isXMLHttpRequest) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        if (token != null) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        let url = api;
        let timeout = 1000 * 60 * 2; // 2 mins
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                return error;
            });
    }
}
export default NetworkManager;