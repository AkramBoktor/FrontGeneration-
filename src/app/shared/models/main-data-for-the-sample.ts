
 export class MainDataForTheSample {
    id: number;
    
	sampleSpecificationCode: string;
	basicMaterial: string;
	subMaterial: string;
	testCode: string;
	samplesMinimumNumber: string;
	calibration: number;
	unit: number;
	standardValue: number;
	constructor(arg?: MainDataForTheSample) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
