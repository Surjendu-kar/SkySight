import Home from "./routes/Home"
import Details from "./routes/Details"
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";

function RouteWrapper({ Component }: any) {
  const location = useLocation();
  const navigate = useNavigate();

  return <Component location={location} navigate={navigate} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteWrapper Component={Home} />,
  },
  {
    path: "/details",
    element: <RouteWrapper Component={Details} />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
