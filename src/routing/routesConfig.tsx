import App from '../App';
import { EstablishmentDetailPage } from '../components/EstablishmentDetailPage';

interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

export const routes: RouteConfig[] = [
  { path: '/', element: <App /> },
  { path: '/detail/:id', element: <EstablishmentDetailPage/> }
];