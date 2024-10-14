import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { MsgRpcService } from "../services/MsgRpcService.js";

export const MsgRpcContext = createContext<MsgRpcService | null>(null);

export const MsgRpcProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [msgRpcService, setMsgRpcService] = useState<MsgRpcService | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setMsgRpcService(await MsgRpcService.getInstance());
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])
  if (loading)
    return <div>Loading...</div>;
  if (error)
    return <div>Error: {error}</div>;
  return (
    <MsgRpcContext.Provider value={msgRpcService}>
      {children}
    </MsgRpcContext.Provider>
  );
};
