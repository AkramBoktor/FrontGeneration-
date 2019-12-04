
 export class ElectricalConnectionsToTheBuilding {
    id: number;
    
	buildingCode: string;
	powerSource: number;
	guoCounter: string;
	facetsNumber: string;
	specialtransformers: string;
	ability: string;
	number: number;
	feederMainCableStrip: string;
	electricalConductivityCode: number;
	networkClosestSourceFeed: string;
	constructor(arg?: ElectricalConnectionsToTheBuilding) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
