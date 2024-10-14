/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { AddChildNodeParams, 
    AddChildNodeResult, 
    AddRootNodeParams, 
    AddRootNodeResult, 
    DeleteBranchParams, 
    DeleteBranchResult, 
    GetChildNodesParams, 
    GetChildNodesResult, 
    GetParentNodeParams, 
    GetParentNodeResult, 
    GetRootNodesParams, 
    GetRootNodesResult, 
    GetTreeParams, 
    GetTreeResult, 
    IDataProvider, 
    MoveAsNthChildOfParams, 
    MoveAsNthChildOfResult, 
    MoveAsNthSiblingOfOfParams, 
    MoveAsNthSiblingOfOfResult, 
    TreeRecord } from "./DataProviderTypes.js"
import { useMsgRpc } from "./useMsgRpc.js"

export class LocalDataProvider {
    constructor(public remoteDataProvider: IDataProvider) {
    }
    async getList(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.getList(resource, params)
        return result
    }

    async getOne(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.getOne(resource, params)
        return result
    }

    async getMany(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.getMany(resource, params)
        return result
    }

    async getManyReference(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.getManyReference(resource, params)
        return result
    }

    async update(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.update(resource, params)
        return result
    }

    async updateMany(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.updateMany(resource, params)
        return result
    }

    async create(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.create(resource, params)
        return result
    }

    async delete(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.delete(resource, params)
        return result
    }

    async deleteMany(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.deleteMany(resource, params)
        return result
    }
    async subscribe(topic: string, subscriptionCallback: any): Promise<any> {
        const result = await this.remoteDataProvider.subscribe(topic, subscriptionCallback)
        return result
    }

    async unsubscribe(topic: string, subscriptionCallback: any): Promise<any> {
        const result = await this.remoteDataProvider.unsubscribe(topic, subscriptionCallback)
        return result
    }

    async publish(topic: string, event: any): Promise<any> {
        const result = await this.remoteDataProvider.publish(topic, event)
        return result
    }
    async lock(resource: string, { id, identity, meta }: any): Promise<any> {
        const result = await this.remoteDataProvider.lock(resource, { id, identity, meta })
        return result
    }
    async unlock(resource: string, { id, identity, meta }: any): Promise<any> {
        const result = await this.remoteDataProvider.unlock(resource, { id, identity, meta })
        return result
    }
    async getLock(resource: string, { id, meta }: any): Promise<any> {
        const result = await this.remoteDataProvider.getLock(resource, { id, meta })
        return result
    }
    async getLocks(resource: string, { meta }: any): Promise<any> {
        const result = await this.remoteDataProvider.getLock(resource, { meta })
        return result
    }
    async getTree(resource: string, params?: GetTreeParams): Promise<GetTreeResult> {
        const result = await this.remoteDataProvider.getTree(resource, params)
        return result
    }

    async getRootNodes(resource: string, params: GetRootNodesParams): Promise<GetRootNodesResult> {
        const result = await this.remoteDataProvider.getRootNodes(resource, params)
        return result
    }

    async getParentNode<RecordType extends TreeRecord = TreeRecord>(resource: string, params: GetParentNodeParams<RecordType>): Promise<GetParentNodeResult> {
        const result = await this.remoteDataProvider.getParentNode(resource, params)
        return result
    }

    async getChildNodes(resource: string, { parentId, meta }: GetChildNodesParams): Promise<GetChildNodesResult> {
        const result = await this.remoteDataProvider.getChildNodes(resource, { parentId, meta })
        return result
    }

    async moveAsNthChildOf(
        resource: string,
        { source, destination, position, meta }: MoveAsNthChildOfParams
    ): Promise<MoveAsNthChildOfResult> {
        const result = await this.remoteDataProvider.moveAsNthChildOf(resource, { source, destination, position, meta })
        return result
    }

    async moveAsNthSiblingOf(
        resource: string,
        { source, destination, position, meta }: MoveAsNthSiblingOfOfParams
    ): Promise<MoveAsNthSiblingOfOfResult> {
        const result = await this.remoteDataProvider.moveAsNthSiblingOf(resource, { source, destination, position, meta })
        return result
    }

    async addRootNode(resource: string, { data, meta }: AddRootNodeParams): Promise<AddRootNodeResult> {
        const result = await this.remoteDataProvider.addRootNode(resource, { data, meta })
        return result
    }

    async addChildNode(resource: string, { parentId, data, meta }: AddChildNodeParams): Promise<AddChildNodeResult> {
        const result = await this.remoteDataProvider.addChildNode(resource, { parentId, data, meta })
        return result
    }

    async deleteBranch(
        resource: string,
        params: DeleteBranchParams
    ): Promise<DeleteBranchResult> {
        const result = await this.remoteDataProvider.deleteBranch(resource, params)
        return result
    }
}

let started = false

export const useRpcDataProvider = (url: string = '', path?: string) => {
    const msgRpc = useMsgRpc()
    const [dataProvider, setDataProvider] = useState<IDataProvider | null>()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        if (!started) {
            started = true
            setDataProvider(null)
            setError(null);
            (async () => {
                try {
                    setIsLoading(true)
                    const rpcConn = await msgRpc.getMsgRpcClient(url, 'web.rapidreach', 'app.rapidreach', path)
                    const api = (await rpcConn.api('dataProvider'))
                    const remoteDataProvider = api.proxy as IDataProvider
                    const localDataProvider = new LocalDataProvider(remoteDataProvider)
                    setDataProvider(localDataProvider)
                    setIsLoading(false)
                } catch (e) {
                    if (e instanceof Error)
                        setError(e)
                    else
                        setError(new Error('Unknown error in useRpcDataProvider'))
                }
            })()
        }
        return () => {
        }
    }, [url, isLoading, msgRpc, path])
    return { dataProvider, isLoading, error }
}
