import Home from "./routes/Home";
import Details from "./routes/Details";
import Login from "./routes/Login";
import SignUp from "./routes/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";

function HomeRoute() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;
  return <RouteWrapper Component={Home} />;
}

function LoginRoute() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  if (user) return null;
  return <RouteWrapper Component={Login} />;
}

function SignUpRoute() {
  // const { user } = useAuthContext();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/home");
  //   }
  // }, [user, navigate]);

  // if (user) return null;
  return <RouteWrapper Component={SignUp} />;
}

interface RouteComponentProps {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
}

function RouteWrapper({
  Component,
}: {
  Component: React.ComponentType<RouteComponentProps>;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return <Component location={location} navigate={navigate} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/details",
    element: <RouteWrapper Component={Details} />,
  },
  {
    path: "/login",
    element: <LoginRoute />,
  },
  {
    path: "/signup",
    element: <SignUpRoute />,
  },
  {
    path: "/home",
    element: <HomeRoute />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
