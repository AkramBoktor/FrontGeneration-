
 export class BenefitsForTheHeirsOfAnEmployee {
    id: number;
    
	checkNumber: string;
	checkDate: Date;
	checkAmount: number;
	employeeCode: string;
	subsidyType: number;
	subsidyAmount: number;
	heirCheckNo: string;
	heirCheckDate: Date;
	heirName: string;
	amount: number;
	constructor(arg?: BenefitsForTheHeirsOfAnEmployee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
