import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticateApp } from 'unauthenticated-app';
import { ErrorBoundary } from "components/error-boundary"
import { FullPageErrorFallback } from "components/lib"
import './App.css';



function App() {

  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {
          user ? <AuthenticatedApp /> : <UnauthenticateApp />
        }
      </ErrorBoundary>

    </div>
  );
}

export default App;
