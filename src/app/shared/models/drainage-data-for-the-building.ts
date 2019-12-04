
 export class DrainageDataForTheBuilding {
    id: number;
    
	buildingCode: string;
	sanitationExists: number;
	sanitationGeneral: number;
	networkDiameter: string;
	networkDepth: string;
	sanitationLocal: number;
	tankanalysis: number;
	tankAssembly: number;
	candidate: number;
	sanitationDitch: number;
	plantation: number;
	gayson: number;
	length: string;
	width: string;
	deep: string;
	constructor(arg?: DrainageDataForTheBuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
