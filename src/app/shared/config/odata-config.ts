import { ODataConfiguration } from 'angular-odata-es5';
import { Constants } from './constants';


export class AppODataConfig extends ODataConfiguration{
    baseUrl = Constants.baseOdataUrl;
}
