import { eLayoutType, RoutesService } from '@abp/ng.core';
import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { eTrainingRouteNames } from '../enums/route-names';
import { FRUITS_FRUIT_ROUTE_PROVIDER } from './fruit-route.provider';

export const TRAINING_ROUTE_PROVIDERS = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

export function configureRoutes() {
  const routesService = inject(RoutesService);
  routesService.add([
    {
      path: '/training',
      name: eTrainingRouteNames.Training,
      iconClass: 'fas fa-book',
      layout: eLayoutType.application,
      order: 3,
    },
  ]);
}

const TRAINING_PROVIDERS: EnvironmentProviders[] = [
  ...TRAINING_ROUTE_PROVIDERS,
  ...FRUITS_FRUIT_ROUTE_PROVIDER,
];

export function provideTraining() {
  return makeEnvironmentProviders(TRAINING_PROVIDERS);
}
