
 export class GasAppliancesData {
    id: number;
    
	buildingCode: string;
	isThereGasInSchool: number;
	gasFeedingSourcesNumber: number;
	extenstion: string;
	floor: string;
	deviceQuality: number;
	spaceName: string;
	constructor(arg?: GasAppliancesData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
