import { version as v, description as d } from '../package.json';
import { BankApi } from './bankApi';

export const version = v;
export const description = d;

export * from './bankApi'
export default BankApi;