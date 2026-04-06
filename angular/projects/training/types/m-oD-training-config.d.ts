import { EnvironmentProviders } from '@angular/core';

declare const enum eTrainingRouteNames {
    Training = "Training"
}

declare const TRAINING_ROUTE_PROVIDERS: EnvironmentProviders[];
declare function configureRoutes(): void;
declare function provideTraining(): EnvironmentProviders;

export { TRAINING_ROUTE_PROVIDERS, configureRoutes, eTrainingRouteNames, provideTraining };
