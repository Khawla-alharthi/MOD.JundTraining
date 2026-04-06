import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44303/',
  redirectUri: baseUrl,
  clientId: 'Jund_App',
  responseType: 'code',
  scope: 'offline_access Jund',
  requireHttps: true,
  impersonation: {
    tenantImpersonation: true,
    userImpersonation: true,
  }
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Jund',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44303',
      rootNamespace: 'MOD.Jund',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
