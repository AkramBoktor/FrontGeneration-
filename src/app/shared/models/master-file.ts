
 export class MasterFile {
    id: number;
    
	buildingType: number;
	buildingCode: string;
	areaCode: number;
	buildingDescription: string;
	laboratoryType: number;
	laboratoryNumber: string;
	equipmentType: number;
	deviceType: number;
	devicesNumber: string;
	deviceNumberFrom: string;
	deviceNumberTo: string;
	style: string;
	manufactured: string;
	startDate: Date;
	warrantyPeriod: string;
	warrantyCondition: number;
	supplyingCompany: string;
	constructor(arg?: MasterFile) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
