import { List, Datagrid, TextField, EditButton, DeleteButton, Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, Edit, Show, SimpleShowLayout } from 'react-admin';

export const ContextList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="description" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ContextEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
            <ArrayInput source="extensions">
                <SimpleFormIterator>
                    <TextInput source="number" label="Extension Number" />
                    <TextInput source="priority" label="Priority" />
                    <ArrayInput source="actions">
                        <SimpleFormIterator>
                            <TextInput source="type" label="Action Type" />
                            <TextInput source="app" label="App" />
                            <TextInput source="parameters" label="Parameters" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const ContextCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
            <ArrayInput source="extensions">
                <SimpleFormIterator>
                    <TextInput source="number" label="Extension Number" />
                    <TextInput source="priority" label="Priority" />
                    <ArrayInput source="actions">
                        <SimpleFormIterator>
                            <TextInput source="type" label="Action Type" />
                            <TextInput source="app" label="App" />
                            <TextInput source="parameters" label="Parameters" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const ContextShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="description" />
            <ArrayInput source="extensions">
                <SimpleFormIterator>
                    <TextField source="number" label="Extension Number" />
                    <TextField source="priority" label="Priority" />
                    <ArrayInput source="actions">
                        <SimpleFormIterator>
                            <TextField source="type" label="Action Type" />
                            <TextField source="app" label="App" />
                            <TextField source="parameters" label="Parameters" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleShowLayout>
    </Show>
);
