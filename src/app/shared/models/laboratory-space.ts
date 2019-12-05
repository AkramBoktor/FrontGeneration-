
 export class LaboratorySpace {
    id: number;
    
	buildingCode: string;
	spaceCode: number;
	spaceName: string;
	annexNumber: string;
	floorNumber: number;
	spaceSeries: number;
	spaceNotConnectedToDevices: number;
	constructor(arg?: LaboratorySpace) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
