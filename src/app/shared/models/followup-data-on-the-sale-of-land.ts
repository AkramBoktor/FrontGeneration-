
 export class FollowupDataOnTheSaleOfLand {
    id: number;
    
	landNumber: number;
	department: string;
	village: string;
	totalArea: string;
	currentOwner: string;
	stage: string;
	sample: string;
	accreditation: string;
	documents: string;
	soothing: string;
	plan: string;
	negotiationEntity: number;
	saleNegotiations: number;
	constructor(arg?: FollowupDataOnTheSaleOfLand) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
