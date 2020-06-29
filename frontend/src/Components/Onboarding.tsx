import React, { useEffect, useCallback, ReactElement, useState } from 'react';
import { AuthenticationResult } from '@feathersjs/authentication/lib';
import authentication from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ProgressState } from './Types/Types';
import clone from '../utils/clone';
import Loading from './Utils/Loading';
import Login, { Auth } from './Login';
import Main from './Main';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: purple,
      secondary: purple,
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  })
);

let socket: SocketIOClient.Socket, client: feathers.Application;
function Onboarding(): ReactElement {
  const [loginAttempt, setLoginAttempt] = useState<ProgressState>(-2);
  const [loginCredentials, setLoginCredentials] = useState<
    AuthenticationResult
  >();

  useEffect(() => {
    if (!client) {
      client = feathers();
      const path: string = clone(window.location.pathname);
      const url = `${
        process.env.REACT_APP_API_PROTOCOL || window.location.protocol
      }//${process.env.REACT_APP_API_HOSTNAME || window.location.hostname}:${
        process.env.REACT_APP_API_PORT || process.env.NODE_ENV === 'development'
          ? '5684'
          : window.location.port
      }`;
      socket = io(url, { path: `${path}/socket.io`.replace('//', '/') });
      client.configure(socketio(socket));
      client.configure(authentication());
    }
  }, []);

  const handleLogin = useCallback(
    (data?: Auth, callback?: (error?: string) => void) => {
      (async (): Promise<void> => {
        try {
          let clientData: AuthenticationResult;
          if (!client) {
            console.warn('Feathers app is undefined');
            return;
          } else if (!data) clientData = await client.reAuthenticate();
          else clientData = await client.authenticate(data, callback);
          console.log('User:', clientData.user);
          setLoginCredentials(clientData.user);
          setLoginAttempt(-1);
          // getConfig(clientData.user._id);
        } catch (error) {
          console.error('Error in handleLogin:', error);
          setLoginAttempt(2);
          setLoginCredentials(undefined);
          if (callback) callback(`Login error: ${error.message}`);
        }
      })();
    },
    []
  );

  useEffect(() => {
    if (!loginCredentials) handleLogin();
  }, [loginCredentials, handleLogin]);

  function handleCreateAccount(
    data: Auth,
    callback?: (error?: string) => void
  ): void {
    socket.emit('create', 'users', data, (error: { message: string }) => {
      if (error) {
        console.error('Error creating account:', error);
        if (callback) callback(`Error creating account: ${error.message}`);
      } else {
        handleLogin(data, callback);
      }
    });
  }

  async function handleLogout(): Promise<void> {
    localStorage.removeItem('hass_tokens');
    localStorage.removeItem('hass_url');
    await client.logout();
    window.location.replace(window.location.href);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loginAttempt === -2 || loginAttempt === -1 ? (
        <Loading
          text={`${
            loginAttempt === -2 ? 'Attempting Login' : 'Loading Config'
          }. Please Wait..`}
        />
      ) : loginCredentials ? (
        <Main loginCredentials={loginCredentials} handleLogout={handleLogout} />
      ) : (
        <Login
          handleCreateAccount={handleCreateAccount}
          handleLogin={handleLogin}
        />
      )}
    </ThemeProvider>
  );
}

export default Onboarding;
