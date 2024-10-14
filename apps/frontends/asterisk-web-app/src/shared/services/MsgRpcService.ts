import { RpcClientConnection, SocketIoTransport } from "@source-repo/msgrpc";

export class MsgRpcService {
    private static instance: MsgRpcService;
    rpcClientConnections = new Map<string, RpcClientConnection>()

    private constructor() {
    }

    public static async getInstance() {
        if (!MsgRpcService.instance) {
            MsgRpcService.instance = new MsgRpcService();
        }
        return MsgRpcService.instance;
    }

    public async getMsgRpcClient(url: string, name: string, defaultTarget?: string, path?: string) {
        const id = `${url}:${name}`
        let result = this.rpcClientConnections.get(id)
        if (!result) {
            const transport = new SocketIoTransport(url, [], { path })
            result = new RpcClientConnection(name, transport, defaultTarget)
            this.rpcClientConnections.set(id, result)
        }
        return result
    }
}
