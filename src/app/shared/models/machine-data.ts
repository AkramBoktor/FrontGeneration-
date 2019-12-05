
 export class MachineData {
    id: number;
    
	buildingType: number;
	primaryGroup: number;
	equipmentGroup: number;
	equipmentType: number;
	equipmentNumber: string;
	equipmentModel: string;
	manufacturer: number;
	operationBeganingdate: Date;
	warrantyPeriodInYears: string;
	vendor: string;
	buildingCode: string;
	territoryCenter: number;
	region: number;
	extensionSerial: string;
	floorNumber: number;
	workshopType: number;
	vendingDate: Date;
	constructor(arg?: MachineData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
