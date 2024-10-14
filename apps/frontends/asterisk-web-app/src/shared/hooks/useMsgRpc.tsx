import { useContext } from "react";
import { MsgRpcService } from "../services/MsgRpcService.js";
import { MsgRpcContext } from "../contexts/MsgRpcContext.js";

export const useMsgRpc = (): MsgRpcService => {
  const context = useContext(MsgRpcContext);
  if (!context) {
    throw new Error("useMsgRpc must be used within a MsgRpcProvider");
  }
  return context;
};
