import { List, Datagrid, TextField, BooleanField, EditButton, DeleteButton, Create, SimpleForm, TextInput, BooleanInput, Edit, Show, SimpleShowLayout } from 'react-admin';

export const TrunkList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="providerName" />
            <TextField source="sipDetails.host" label="Host" />
            <BooleanField source="isActive" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const TrunkEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="providerName" />
            <TextInput source="sipDetails.host" label="Host" />
            <TextInput source="sipDetails.username" label="Username" />
            <TextInput source="sipDetails.password" label="Password" />
            <BooleanInput source="isActive" />
        </SimpleForm>
    </Edit>
);

export const TrunkCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="providerName" />
            <TextInput source="sipDetails.host" label="Host" />
            <TextInput source="sipDetails.username" label="Username" />
            <TextInput source="sipDetails.password" label="Password" />
            <BooleanInput source="isActive" defaultValue={true} />
        </SimpleForm>
    </Create>
);

export const TrunkShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="providerName" />
            <TextField source="sipDetails.host" label="Host" />
            <TextField source="sipDetails.username" label="Username" />
            <TextField source="sipDetails.password" label="Password" />
            <BooleanField source="isActive" />
        </SimpleShowLayout>
    </Show>
);
