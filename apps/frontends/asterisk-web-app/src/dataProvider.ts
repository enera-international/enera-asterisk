import {
    DataProvider,
    RaRecord,
    Identifier,
    GetListParams,
    GetOneParams,
    GetManyParams,
    GetManyReferenceParams,
    CreateParams,
    UpdateParams,
    UpdateManyParams,
    DeleteParams,
    DeleteManyParams,
    UpdateManyResult,
    GetListResult,
    GetOneResult
} from 'react-admin';
import { io, Socket } from 'socket.io-client';
import ObjectId from 'bson-objectid';

const socket: Socket = io('http://localhost:4000'); // Update with your server URL

export const webSocketDataProvider: DataProvider = {
    getList: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: GetListParams
    ): Promise<GetListResult<RecordType>> => {
        return new Promise((resolve, reject) => {
            socket.emit('fetch', { collection: resource, filter: params.filter });

            socket.on('data', (data: any[]) => {
                resolve({
                    data: data.map(item => ({ ...item, id: item._id })) as RecordType[],
                    total: data.length,
                });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    getOne: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: GetOneParams
    ): Promise<GetOneResult<RecordType>> => {
        return new Promise((resolve, reject) => {
            socket.emit('fetch', { collection: resource, filter: { _id: new ObjectId(params.id) } });

            socket.on('data', (data: any[]) => {
                resolve({ data: { ...data[0], id: data[0]._id } as RecordType });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    getMany: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: GetManyParams
    ): Promise<GetListResult<RecordType>> => {
        return new Promise((resolve, reject) => {
            socket.emit('fetch', { collection: resource, filter: { _id: { $in: params.ids.map(id => new ObjectId(id as string)) } } });

            socket.on('data', (data: any[]) => {
                resolve({ data: data.map(item => ({ ...item, id: item._id })) as RecordType[] });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    getManyReference: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: GetManyReferenceParams
    ): Promise<GetListResult<RecordType>> => {
        return new Promise((resolve, reject) => {
            const { target, id } = params;
            socket.emit('fetch', { collection: resource, filter: { [target]: id } });

            socket.on('data', (data: any[]) => {
                resolve({
                    data: data.map(item => ({ ...item, id: item._id })) as RecordType[],
                    total: data.length,
                });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    create: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: CreateParams
    ): Promise<{ data: RecordType }> => {
        return new Promise((resolve, reject) => {
            socket.emit('create', { collection: resource, data: params.data });

            socket.on('created', (data: any) => {
                resolve({ data: { ...data, id: data._id } as RecordType });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    update: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: UpdateParams
    ): Promise<{ data: RecordType }> => {
        return new Promise((resolve, reject) => {
            socket.emit('update', { collection: resource, id: params.id, data: params.data });

            socket.on('updated', (data: any) => {
                resolve({ data: { ...data, id: data._id } as RecordType });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    updateMany: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: UpdateManyParams<RecordType>
    ): Promise<UpdateManyResult> => {
        return new Promise((resolve, reject) => {
            socket.emit('updateMany', {
                collection: resource,
                ids: params.ids.map(id => new ObjectId(id as string)),
                data: params.data,
            });

            // Assuming the server returns an array of updated record IDs
            socket.on('updatedMany', (updatedIds: Identifier[]) => {
                resolve({ data: updatedIds });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    delete: async <RecordType extends RaRecord<Identifier> = any>(
        resource: string,
        params: DeleteParams
    ): Promise<{ data: RecordType }> => {
        return new Promise((resolve, reject) => {
            socket.emit('delete', { collection: resource, id: params.id });

            socket.on('deleted', (id: any) => {
                resolve({ data: { id } as RecordType });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },

    deleteMany: async (
        resource: string,
        params: DeleteManyParams
    ): Promise<{ data: Identifier[] }> => {
        return new Promise((resolve, reject) => {
            socket.emit('deleteMany', { collection: resource, ids: params.ids.map(id => new ObjectId(id)) });

            socket.on('deletedMany', () => {
                resolve({ data: params.ids });
            });

            socket.on('error', (error: any) => {
                reject(error);
            });
        });
    },
};
