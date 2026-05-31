import {
  Suspense,
  lazy
} from "react";

import {
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom";

import { ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";

const AuthPage = lazy(
  () => import("@/pages/AuthPage")
);

const DashboardPage = lazy(
  () => import("@/pages/DashboardPage")
);

const MeetingLobbyPage = lazy(
  () =>
    import(
      "@/pages/MeetingLobbyPage"
    )
);

const MeetingRoomPage = lazy(
  () =>
    import(
      "@/pages/MeetingRoomPage"
    )
);

const PostMeetingPage = lazy(
  () =>
    import(
      "@/pages/PostMeetingPage"
    )
);

const TeamWorkspacePage = lazy(
  () =>
    import(
      "@/pages/TeamWorkspacePage"
    )
);

const ProfilePage = lazy(
  () => import("@/pages/ProfilePage")
);

const AnalyticsPage = lazy(
  () =>
    import(
      "@/pages/AnalyticsPage"
    )
);

function ProtectedRoute() {
  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated
    );

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.AUTH}
        replace
      />
    );
  }

  return <Outlet />;
}

function PublicRoute() {
  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated
    );

  if (isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return <Outlet />;
}

function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading...
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <RouteLoader />
      }
    >
      <Routes>
        <Route
          element={
            <PublicRoute />
          }
        >
          <Route
            path={ROUTES.AUTH}
            element={
              <AuthPage />
            }
          />
        </Route>

        <Route
          element={
            <ProtectedRoute />
          }
        >
          <Route
            path={ROUTES.ROOT}
            element={
              <Navigate
                to={
                  ROUTES.DASHBOARD
                }
                replace
              />
            }
          />

          <Route
            path={
              ROUTES.DASHBOARD
            }
            element={
              <DashboardPage />
            }
          />

          <Route
            path={
              ROUTES.MEETING_LOBBY
            }
            element={
              <MeetingLobbyPage />
            }
          />

          <Route
            path={
              ROUTES.MEETING_ROOM
            }
            element={
              <MeetingRoomPage />
            }
          />

          <Route
            path={`${ROUTES.POST_MEETING}/:meetingId`}
            element={
              <PostMeetingPage />
            }
          />

          <Route
            path={
              ROUTES.WORKSPACE
            }
            element={
              <TeamWorkspacePage />
            }
          />

          <Route
            path={
              ROUTES.PROFILE
            }
            element={
              <ProfilePage />
            }
          />

          <Route
            path={
              ROUTES.ANALYTICS
            }
            element={
              <AnalyticsPage />
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to={
                ROUTES.AUTH
              }
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
}