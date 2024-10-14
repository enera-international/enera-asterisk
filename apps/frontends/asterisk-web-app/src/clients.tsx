import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    Show,
    SimpleShowLayout,
    ShowButton,
    EditButton,
    DeleteButton,
    useRecordContext
} from 'react-admin';

// List component for Clients
export const ClientList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            {/* We do not display the password for security reasons */}
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Edit component for Clients
export const ClientEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Edit>
);

// Create component for Clients
export const ClientCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Create>
);

// Show component for Clients
export const ClientShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            {/* We do not show the password for security reasons */}
        </SimpleShowLayout>
    </Show>
);
