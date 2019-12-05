
 export class MachineLinkedToTheLaboratory {
    id: number;
    
	machineCode: string;
	machineName: string;
	laboratoryCode: number;
	constructor(arg?: MachineLinkedToTheLaboratory) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
