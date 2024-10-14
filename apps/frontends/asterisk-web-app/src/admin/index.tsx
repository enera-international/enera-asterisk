import { Admin } from "@react-admin/ra-enterprise";
import { authProvider } from "./authProvider.js";
import { UserCreate, UserEdit, UserList, UserShow } from "../users.js";
import { useReactAdminRpcDataProvider } from "../shared/hooks/useReactAdminRpcDataProvider.js";
import { ContextList, ContextEdit, ContextCreate, ContextShow } from "../Contexts.js";
import { DialPlanList, DialPlanEdit, DialPlanCreate, DialPlanShow } from "../DialPlans.js";
import { TrunkList, TrunkEdit, TrunkCreate, TrunkShow } from "../Trunks.js";
import { MyLayout } from "../layout/MyLayout.js";
import { myDarkTheme, myLightTheme } from "../shared/layout/MyTheme.js";

import GroupIcon from '@mui/icons-material/Group';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import ApiIcon from '@mui/icons-material/Api';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import Dashboard from "../Dashboard.js";
import { CustomRoutes, Resource } from "react-admin";
import { ClientList, ClientEdit, ClientCreate, ClientShow } from "../clients.js";
import { Route } from "react-router-dom";
import { PreferencesPage } from "../Preferences.js";

const apiUrl = (import.meta.env.VITE_PROJECT_API_URL !== undefined) ? import.meta.env.VITE_PROJECT_API_URL : 'http://localhost:3001'
const App = () => {
  const dataProvider = useReactAdminRpcDataProvider({ url: apiUrl, path: import.meta.env.VITE_PROJECT_SOCKETIO_PATH })
  return (
    <Admin
      authProvider={authProvider}
      dashboard={Dashboard}
      dataProvider={dataProvider}
      lightTheme={myLightTheme}
      darkTheme={myDarkTheme}
      layout={MyLayout}>
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        show={UserShow}
        icon={GroupIcon}
      />
      <Resource
        name="clients"
        options={{ label: 'API Clients' }}
        list={ClientList}
        edit={ClientEdit}
        create={ClientCreate}
        show={ClientShow}
        icon={ApiIcon}
      />
      <Resource
        name="trunks"
        list={TrunkList}
        edit={TrunkEdit}
        create={TrunkCreate}
        show={TrunkShow}
        icon={SettingsInputAntennaIcon}
      />
      <Resource
        name="dialplans"
        list={DialPlanList}
        edit={DialPlanEdit}
        create={DialPlanCreate}
        show={DialPlanShow}
        icon={SettingsPhoneIcon}
      />
      <Resource
        name="contexts"
        list={ContextList}
        edit={ContextEdit}
        create={ContextCreate}
        show={ContextShow}
        icon={SwitchAccountIcon}
      />
      <CustomRoutes>
        <Route path="/preferences" element={<PreferencesPage />} />
      </CustomRoutes>
    </Admin>
  );
};

export default App;