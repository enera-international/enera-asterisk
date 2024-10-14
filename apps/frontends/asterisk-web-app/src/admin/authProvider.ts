import { AuthProvider, UserIdentity } from "react-admin";
import { MsgRpcService } from "../shared/services/MsgRpcService.js"

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        localStorage.removeItem('auth');
        const msgRpc = await MsgRpcService.getInstance()
        const authUrl = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001/'
        const client = await msgRpc.getMsgRpcClient(authUrl, 'eneraWebClient')
        const authClient = (await client.api('authentication', 'app.rapidreach')).proxy as { authenticate: (username: string, password: string) => Promise<any> }
        const response = await authClient.authenticate(username, password)
        if (response?.accessToken) {
            localStorage.setItem('auth', JSON.stringify({ accessToken: response.accessToken, id: response.user.id, fullName: response.user.fullName }))
            return Promise.resolve()
        }
        return Promise.reject()
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: async () => {
        let userIdentity: UserIdentity = { id: '' }
        const authString = localStorage.getItem('auth')
        if (authString) {
            const auth = JSON.parse(authString)
            userIdentity = {
                id: auth?.id,
                fullName: auth?.fullName,
            }
        }
        return userIdentity
    },
    getPermissions: () => Promise.resolve(''),
};
