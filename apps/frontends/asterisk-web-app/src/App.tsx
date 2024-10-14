import MyAdmin from "./admin/index.js";
import { MsgRpcProvider } from "./shared/contexts/MsgRpcContext.js";

const App = () => <MsgRpcProvider>
    <MyAdmin />
  </MsgRpcProvider>;

export default App;