import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { FRUIT_BASE_ROUTES } from './fruit-base.routes';

export const FRUITS_FRUIT_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...FRUIT_BASE_ROUTES];
  routesService.add(routes);
}
