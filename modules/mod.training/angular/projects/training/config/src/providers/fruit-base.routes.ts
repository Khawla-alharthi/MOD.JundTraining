import { ABP, eLayoutType } from '@abp/ng.core';

import { eTrainingRouteNames } from '../enums/route-names';

export const FRUIT_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/training/fruits',
    parentName: eTrainingRouteNames.Training,
    name: 'Training::Menu:Fruits',
    layout: eLayoutType.application,
    requiredPolicy: 'Training.Fruits',
    breadcrumbText: 'Training::Fruits',
  },
];
