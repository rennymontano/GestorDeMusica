import { base } from './environment-base';

base.production = false;
base.enableLogger = true;
base.urlApi= 'http://localhost:3000';

export const environment = base;

export { base };