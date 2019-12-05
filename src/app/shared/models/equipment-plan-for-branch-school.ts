
 export class EquipmentPlanForBranchSchool {
    id: number;
    
	processingType: number;
	equipmentPlanYear: string;
	planType: number;
	branch: number;
	schoolNumber: string;
	extensionNumber: string;
	constructor(arg?: EquipmentPlanForBranchSchool) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
