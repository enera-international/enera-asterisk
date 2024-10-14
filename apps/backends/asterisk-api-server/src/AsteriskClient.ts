import { promisify } from 'util';
import { EventEmitter } from 'events';
import AsteriskManager from 'asterisk-manager';

export class AsteriskClient extends EventEmitter {
  private ami: any;

  constructor(
    port: number,
    host: string,
    username: string,
    password: string,
    enableEvents: boolean = true
  ) {
    // Call the EventEmitter constructor
    super();

    // Initialize AMI connection
    this.ami = new AsteriskManager(port, host, username, password, enableEvents);
    this.ami.keepConnected(); // Ensure the connection stays alive

    // Log connection status
    this.ami.on('connect', () => {
      console.log('Connected to Asterisk Manager Interface!');
    });

    // Handle errors
    this.ami.on('error', (err: any) => {
      console.error('AMI Error:', err);
      this.emit('error', err); // Emit an error event
    });

    // Attach common AMI event listeners
    this.attachAmiEventHandlers();
  }

  // Attach listeners for common AMI events
  private attachAmiEventHandlers(): void {
    this.ami.on('managerevent', (event: any) => {
      switch (event.event) {
        case 'NewChannel':
          this.emit('newChannel', event);
          break;
        case 'Dial':
          this.emit('dial', event);
          break;
        case 'Hangup':
          this.emit('hangup', event);
          break;
        case 'BridgeEnter':
          this.emit('bridgeEnter', event);
          break;
        case 'BridgeLeave':
          this.emit('bridgeLeave', event);
          break;
        default:
          this.emit('amiEvent', event); // Emit generic event if not one of the above
          break;
      }
    });
  }

  // Async method to retrieve active calls (channels)
  public async getActiveCalls(): Promise<any> {
    const action = promisify(this.ami.action.bind(this.ami));

    try {
      const result = await action({ action: 'Status' });
      return result;
    } catch (error) {
      console.error('Error retrieving active calls:', error);
      throw error;
    }
  }

  // Async method to retrieve registered SIP users (peers)
  public async getSipPeers(): Promise<any> {
    const action = promisify(this.ami.action.bind(this.ami));

    try {
      const result = await action({ action: 'SIPPeers' });
      return result;
    } catch (error) {
      console.error('Error retrieving SIP peers:', error);
      throw error;
    }
  }

  // Async method to retrieve active channels (trunks/calls)
  public async getActiveChannels(): Promise<any> {
    const action = promisify(this.ami.action.bind(this.ami));

    try {
      const result = await action({ action: 'CoreShowChannels' });
      return result;
    } catch (error) {
      console.error('Error retrieving active channels:', error);
      throw error;
    }
  }

  // Method to close the AMI connection
  public closeConnection(): void {
    this.ami.disconnect();
    console.log('Disconnected from Asterisk Manager Interface.');
  }
}
