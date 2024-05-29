import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./Redux/store";

import MainPage from "./Components/Pages/MainPage";
import ProductResiavingPage from "./Components/Pages/ProductResiavingPage";
import ProductMovingPage from "./Components/Pages/ProductMovingPage";
import RemarkPage from "./Components/Pages/RemarkPage";
import ReportsPage from "./Components/Pages/ReportsPage";
import InventarisationPage from "./Components/Pages/InventarisationPage";
import RemovingPage from "./Components/Pages/RemovingPage";
import OrganizationPage from "./Components/Pages/OrganizationPage";
import ErrorPage from "./Components/Pages/ErrorPage";

import OrganizationsPart from "./Components/OrganizationViews/OrganizationsPart";
import StocksPart from "./Components/OrganizationViews/StocksPart";
import RacksPart from "./Components/OrganizationViews/RacksPart";
import LoginWindow from "./Components/Authorization/LoginWindow";
import SigninWindow from "./Components/Authorization/SigninWindow";
import ProductReciavingWindow from "./Components/StepsWindows/ProductReciavingWindow/ProductReciavingWindow";
import ProductReciavingWithContractWindow from "./Components/StepsWindows/ProductResiavingWithContract/ProductResiavingWithContractWindow";
import ProductUnpackingWindow from "./Components/StepsWindows/ProductsUnpacking/ProductUnpackingWindow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      { path: "login", element: <LoginWindow /> },
      { path: "signin", element: <SigninWindow /> },
    ],
  },
  { path: "/resiaving/steps", element: <ProductReciavingWindow /> },
  { path: "/remark/steps", element: <ProductReciavingWithContractWindow /> },
  { path: "/redirecting/steps", element: <ProductUnpackingWindow /> },
  { path: "/resiaving", element: <ProductResiavingPage /> },
  { path: "/redirecting", element: <ProductMovingPage /> },
  { path: "/remark", element: <RemarkPage /> },
  { path: "/reports", element: <ReportsPage /> },
  { path: "/inventarisation", element: <InventarisationPage /> },
  { path: "/removing", element: <RemovingPage /> },
  {
    path: "/organization",
    element: <OrganizationPage />,
    children: [
      { path: "org", element: <OrganizationsPart /> },
      { path: "stores", element: <StocksPart /> },
      { path: "racks", element: <RacksPart /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
