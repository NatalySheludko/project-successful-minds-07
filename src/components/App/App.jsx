import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

import { Toaster } from 'react-hot-toast';

const UpdatePasswordPage = lazy(() =>
  import('../../pages/UpdatePasswordPage/UpdatePasswordPage')
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage'));
const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  return (
    <div>
      <SharedLayout>
        <Suspense fallback={<Toaster />}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/"
              element={
                <PrivateRoute component={HomePage} redirectTo="/welcome" />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute component={SignupPage} redirectTo="/home" />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute component={SigninPage} redirectTo="/home" />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute component={HomePage} redirectTo="/signup" />
              }
            />
            <Route
              path="/update-password"
              element={
                <PrivateRoute
                  component={UpdatePasswordPage}
                  redirectTo="/signin"
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
