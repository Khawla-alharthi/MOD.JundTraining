import { RoutesService } from '@abp/ng.core';
import { provideAppInitializer, inject, makeEnvironmentProviders } from '@angular/core';

const FRUIT_BASE_ROUTES = [
    {
        path: '/training/fruits',
        parentName: "Training" /* eTrainingRouteNames.Training */,
        name: 'Training::Menu:Fruits',
        layout: "application" /* eLayoutType.application */,
        requiredPolicy: 'Training.Fruits',
        breadcrumbText: 'Training::Fruits',
    },
];

const FRUITS_FRUIT_ROUTE_PROVIDER = [
    provideAppInitializer(() => {
        configureRoutes$1();
    }),
];
function configureRoutes$1() {
    const routesService = inject(RoutesService);
    const routes = [...FRUIT_BASE_ROUTES];
    routesService.add(routes);
}

const TRAINING_ROUTE_PROVIDERS = [
    provideAppInitializer(() => {
        configureRoutes();
    }),
];
function configureRoutes() {
    const routesService = inject(RoutesService);
    routesService.add([
        {
            path: '/training',
            name: "Training" /* eTrainingRouteNames.Training */,
            iconClass: 'fas fa-book',
            layout: "application" /* eLayoutType.application */,
            order: 3,
        },
    ]);
}
const TRAINING_PROVIDERS = [
    ...TRAINING_ROUTE_PROVIDERS,
    ...FRUITS_FRUIT_ROUTE_PROVIDER,
];
function provideTraining() {
    return makeEnvironmentProviders(TRAINING_PROVIDERS);
}

/**
 * Generated bundle index. Do not edit.
 */

export { TRAINING_ROUTE_PROVIDERS, configureRoutes, provideTraining };
//# sourceMappingURL=m-oD-training-config.mjs.map
