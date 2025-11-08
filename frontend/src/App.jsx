import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout.jsx";

import PageLoader from "./components/PageLoader.jsx";

import useAuthUser from "./hooks/useAuthUser.js";
import { useThemeStore } from "./store/useThemeStore.js";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import FriendsPage from "./components/FriendsPage.jsx";
const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  if (isLoading) {
    return <PageLoader />;
  }



  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <FriendsPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/search"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <SearchPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/edit-profile"
          element={
            isAuthenticated && isOnboarded ? (
              <EditProfilePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "login" : "onboarding"} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && isOnboarded && authUser?.role === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
