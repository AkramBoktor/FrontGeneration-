
 export class TransferOfSupplyOrdersFromSchoolsClosure {
    id: number;
    
	closureType: number;
	closedBuildingNumber: string;
	buildingNumberTransferred: string;
	annexNumber: string;
	constructor(arg?: TransferOfSupplyOrdersFromSchoolsClosure) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
