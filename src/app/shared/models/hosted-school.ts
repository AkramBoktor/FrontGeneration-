
 export class HostedSchool {
    id: number;
    
	hostSchoolNumber: string;
	hostingReasons: number;
	hostingDurationFrom: Date;
	durationTo: Date;
	hostedSchoolNumber: string;
	hostedSchoolStage: number;
	pupilsType: number;
	pupilsNumber: string;
	spacesUsedNumber: string;
	constructor(arg?: HostedSchool) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
