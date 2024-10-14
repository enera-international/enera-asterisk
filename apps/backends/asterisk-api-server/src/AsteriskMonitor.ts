import { AsteriskClient } from './AsteriskClient.js';

// Configuration for Asterisk AMI
const port = 5038;
const host = '192.168.1.210';
const username = 'linehandler';
const password = 'U1BNB2OkKRL5E8rKqmK13MzXWbw9GcQUJsHy';

const amiClient = new AsteriskClient(port, host, username, password);

// Listen to specific AMI events
amiClient.on('newChannel', (event) => {
  console.log('New channel event:', event);
});

amiClient.on('dial', (event) => {
  console.log('Dial event:', event);
});

amiClient.on('hangup', (event) => {
  console.log('Hangup event:', event);
});

// Generic AMI event listener (for all other events)
amiClient.on('amiEvent', (event) => {
  console.log('Other AMI event:', event);
});

// Handle errors
amiClient.on('error', (err) => {
  console.error('AMI Error event:', err);
});

export async function asteriskStatus() {
  try {
    /*
    const activeCalls = await amiClient.getActiveCalls();
    console.log('Active Calls:', activeCalls);

    const sipPeers = await amiClient.getSipPeers();
    console.log('SIP Peers:', sipPeers);

    const activeChannels = await amiClient.getActiveChannels();
    console.log('Active Channels:', activeChannels);
    */
  } catch (error) {
    console.error('Error:', error);
  } finally {
    //amiClient.closeConnection();
  }
}
