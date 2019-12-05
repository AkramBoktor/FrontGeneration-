
 export class HealthUnitData {
    id: number;
    
	governorateCode: number;
	department: number;
	village: number;
	follower: number;
	healthDirectorate: number;
	healthManagement: number;
	mainUnitType: number;
	subUnitType: string;
	unitCode: string;
	unitName: string;
	unitAddress: string;
	unitPhone: string;
	property: string;
	familyNumber: number;
	projectType: number;
	constructor(arg?: HealthUnitData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
