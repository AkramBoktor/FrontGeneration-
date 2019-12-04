
 export class ExternalServicesCodesAndCost {
    id: number;
    
	serviceCode: string;
	serviceName: string;
	firstClassificationCostRatio: number;
	secondClassificationCostRatio: number;
	thirdClassificationCostRatio: number;
	constructor(arg?: ExternalServicesCodesAndCost) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
