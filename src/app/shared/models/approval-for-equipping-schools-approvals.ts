
 export class ApprovalForEquippingSchoolsApprovals {
    id: number;
    
	processingType: number;
	yearPlan: Date;
	branch: number;
	constructor(arg?: ApprovalForEquippingSchoolsApprovals) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
