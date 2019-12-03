
 export class ProducingMaterialForApprovedCompanies {
    id: number;
    
	companyCode: string;
	mainMaterialCode: string;
	subMaterialCode: string;
	subMaterialName: string;
	constructor(arg?: ProducingMaterialForApprovedCompanies) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
