
 export class BasicDataForTheYouthCenter {
    id: number;
    
	governorate: number;
	regionalCenter: number;
	centerName: string;
	sectionCenter: number;
	neighborhoodVillage: number;
	constructor(arg?: BasicDataForTheYouthCenter) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
