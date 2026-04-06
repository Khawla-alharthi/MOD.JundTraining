import { ABP, eLayoutType } from '@abp/ng.core';

export const VEG_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/vegs',
    iconClass: 'fas fa-file-alt',
    name: '::Menu:Vegs',
    layout: eLayoutType.application,
    requiredPolicy: 'Jund.Vegs',
    breadcrumbText: '::Vegs',
  },
];
