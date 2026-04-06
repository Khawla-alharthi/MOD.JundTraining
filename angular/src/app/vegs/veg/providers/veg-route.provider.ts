import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { VEG_BASE_ROUTES } from './veg-base.routes';

export const VEGS_VEG_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...VEG_BASE_ROUTES];
  routesService.add(routes);
}
