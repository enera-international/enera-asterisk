import { addRevisionMethodsBasedOnSingleResource } from '@react-admin/ra-history';
//import { AuthProvider } from 'react-admin';
import { useRpcDataProvider } from './useRpcDataprovider.js'
import { IDataProvider } from "./DataProviderTypes.js";

function cloneWithMethods(obj: object) {
    const newObj: { [index: string]: unknown } = {...obj}
    let proto = Object.getPrototypeOf(obj)
    while (proto && proto !== Object.prototype) {
        Object.getOwnPropertyNames(proto).forEach(name => {
            if (typeof proto[name] === 'function') {
                newObj[name] = proto[name].bind(newObj)
            }
        })
        proto = Object.getPrototypeOf(proto)
    }
    return newObj
}

export const useReactAdminRpcDataProvider = ({ url, path} : { url: string, path: string }) => {
    const rpcDataProvider = useRpcDataProvider(url, path)
    const localDataProvider = rpcDataProvider.dataProvider
    let dp
    if (!rpcDataProvider.isLoading && localDataProvider)
        dp = cloneWithMethods(localDataProvider) as unknown as IDataProvider
    return (!rpcDataProvider.isLoading && localDataProvider) ? addRevisionMethodsBasedOnSingleResource(dp as IDataProvider, { resourceName: "revisions" }) : undefined
}
