
 export class BasicDataOfThePlot {
    id: number;
    
	pieceNumber: string;
	landName: string;
	centerDepartment: number;
	villageNeighborhood: number;
	followVillage: number;
	totalArea: string;
	landOwner: number;
	constructor(arg?: BasicDataOfThePlot) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
