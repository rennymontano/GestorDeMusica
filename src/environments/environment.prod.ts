import { base } from './environment-base';

base.production = true;
base.enableLogger = false;
base.urlApi= 'http://localhost:3000';

export const environment = base;

export { base };