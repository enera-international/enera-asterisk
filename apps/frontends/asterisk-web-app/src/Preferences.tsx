import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Switch, FormControlLabel } from '@mui/material';

// PreferencesPage Component
const PreferencesPage = () => {
  // State for IMAP configuration with default values
  const [imapServer, setImapServer] = useState('imap.example.com');
  const [imapPort, setImapPort] = useState('993'); // IMAP default secure port
  const [imapUseOAuth2, setImapUseOAuth2] = useState(true); // Assuming OAuth2 is used by default

  // State for SMTP configuration with default values
  const [smtpServer, setSmtpServer] = useState('smtp.example.com');
  const [smtpPort, setSmtpPort] = useState('587'); // SMTP default port
  const [smtpUseOAuth2, setSmtpUseOAuth2] = useState(true); // Assuming OAuth2 is used by default

  // OAuth2 client settings with default values
  const [oauthClientId, setOauthClientId] = useState('your-client-id');
  const [oauthClientSecret, setOauthClientSecret] = useState('your-client-secret');
  const [oauthRedirectUri, setOauthRedirectUri] = useState('https://yourapp.com/oauth/callback');

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to save preferences, such as making an API call
    const preferences = {
      imap: {
        server: imapServer,
        port: imapPort,
        useOAuth2: imapUseOAuth2,
      },
      smtp: {
        server: smtpServer,
        port: smtpPort,
        useOAuth2: smtpUseOAuth2,
      },
      oauth2: {
        clientId: oauthClientId,
        clientSecret: oauthClientSecret,
        redirectUri: oauthRedirectUri,
      },
    };
    console.log('Preferences saved:', preferences);
  };

  return (
    <Box
      component="form"
      sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Server Preferences
      </Typography>

      {/* IMAP Settings */}
      <Typography variant="h6" gutterBottom>
        IMAP Settings
      </Typography>
      <TextField
        label="IMAP Server"
        variant="outlined"
        fullWidth
        value={imapServer}
        onChange={(e) => setImapServer(e.target.value)}
        margin="normal"
      />
      <TextField
        label="IMAP Port"
        variant="outlined"
        fullWidth
        value={imapPort}
        onChange={(e) => setImapPort(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={imapUseOAuth2}
            onChange={(e) => setImapUseOAuth2(e.target.checked)}
          />
        }
        label="Use OAuth2 for IMAP"
      />

      {/* SMTP Settings */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        SMTP Settings
      </Typography>
      <TextField
        label="SMTP Server"
        variant="outlined"
        fullWidth
        value={smtpServer}
        onChange={(e) => setSmtpServer(e.target.value)}
        margin="normal"
      />
      <TextField
        label="SMTP Port"
        variant="outlined"
        fullWidth
        value={smtpPort}
        onChange={(e) => setSmtpPort(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={smtpUseOAuth2}
            onChange={(e) => setSmtpUseOAuth2(e.target.checked)}
          />
        }
        label="Use OAuth2 for SMTP"
      />

      {/* OAuth2 Client Settings */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        OAuth2 Client Settings
      </Typography>
      <TextField
        label="Client ID"
        variant="outlined"
        fullWidth
        value={oauthClientId}
        onChange={(e) => setOauthClientId(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Client Secret"
        variant="outlined"
        fullWidth
        value={oauthClientSecret}
        onChange={(e) => setOauthClientSecret(e.target.value)}
        margin="normal"
        type="password"
      />
      <TextField
        label="Redirect URI"
        variant="outlined"
        fullWidth
        value={oauthRedirectUri}
        onChange={(e) => setOauthRedirectUri(e.target.value)}
        margin="normal"
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
        Save Preferences
      </Button>
    </Box>
  );
};

// Export PreferencesPage component (without default export)
export { PreferencesPage };
