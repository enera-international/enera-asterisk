import { MyAppBar } from './MyAppBar';
import { AppLocationContext, Breadcrumb } from '@react-admin/ra-navigation';
import { CheckForApplicationUpdate } from 'react-admin';
import { ReactNode } from 'react';
//import { Layout } from '@react-admin/ra-enterprise';
import { Layout } from 'react-admin';

export const MyLayout = ({ children }: { children?: ReactNode }) => {
    return  <AppLocationContext hasDashboard>
        <Layout appBar={MyAppBar} appBarAlwaysOn >
            <Breadcrumb />
            {children}
            <CheckForApplicationUpdate />
        </Layout>
    </AppLocationContext>
};