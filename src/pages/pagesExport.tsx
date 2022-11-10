import { useRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import DetailPage from "./DetailPage";

const Pages = () => {
  let routes = useRoutes([
    { element: <HomePage />, path: "/" },
    {
      element: <DetailPage />,
      path: "/detail",
      children: [{ element: <DetailPage />, path: "/detail/:id" }],
    },
  ]);
  return routes;
};
export default Pages;
