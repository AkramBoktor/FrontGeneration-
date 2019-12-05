
 export class SocialWelfareForTheHeirsOfAnEmployee {
    id: number;
    
	checkNumber: string;
	checkDate: Date;
	checkAmount: number;
	employeeCode: string;
	heirCheckNo: number;
	heirCheckDate: Date;
	heirName: string;
	amount: number;
	constructor(arg?: SocialWelfareForTheHeirsOfAnEmployee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
