// User Interface for VoIP Phone Users
export interface IUser {
  _id?: string; // MongoDB ID
  username: string;
  password: string; // stored securely, typically hashed
  phoneNumber: string;
  email: string;
  isActive: boolean;
  role: 'admin' | 'user'; // Example roles
}

// Trunk Interface for connections with public phone providers
export interface ITrunk {
  _id?: string;
  providerName: string;
  sipDetails: {
      host: string;
      username: string;
      password: string;
  };
  isActive: boolean;
}

// Call Session Interface
export interface ICallSession {
  _id?: string;
  callerId: string;
  calleeId: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'failed';
  trunkId: string; // References Trunk
}

// Log Interface for tracking call logs or errors
export interface ILog {
  _id?: string;
  sessionId: string; // References CallSession
  message: string;
  level: 'info' | 'warn' | 'error';
  timestamp: Date;
}

// Dial Plan Interface
export interface IDialPlan {
  _id?: string;
  name: string; // Name of the dial plan
  description?: string;
  contexts: IContext[]; // Array of contexts
}

// Context Interface
export interface IContext {
  _id?: string;
  name: string; // Context name (e.g., "from-internal", "from-external")
  description?: string;
  extensions: IExtension[]; // Array of extensions in this context
}

// Extension Interface
export interface IExtension {
  _id?: string;
  number: string; // Extension number (e.g., "1001")
  priority: number; // Priority within the context (Asterisk uses priority for dial plan flow)
  actions: IAction[]; // Actions taken when this extension is dialed
}

// Action Interface
export interface IAction {
  _id?: string;
  type: ActionType; // Different actions to be taken, see enum
  app: string; // Asterisk app to be executed (e.g., "Dial", "Voicemail", "Hangup")
  parameters: unknown; // Parameters for the Asterisk application
}

// Action Type Enum
export enum ActionType {
  DIAL = 'Dial',
  VOICEMAIL = 'Voicemail',
  HANGUP = 'Hangup',
  ANSWER = 'Answer',
  WAIT = 'Wait',
  PLAYBACK = 'Playback',
  GOTO = 'Goto'
}
