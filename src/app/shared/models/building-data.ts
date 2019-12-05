
 export class BuildingData {
    id: number;
    
	actingEngineer: string;
	sectorHead: string;
	maintenanceDepartmentHead: string;
	areaManager: string;
	followerEngineerOfficeBranch: string;
	constructor(arg?: BuildingData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
