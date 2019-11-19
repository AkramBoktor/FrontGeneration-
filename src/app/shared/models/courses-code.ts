
 export class CoursesCode {
    id: number;
    
	majorClassification: number;
	subcategory: number;
	courseCode: string;
	courseName: string;
	constructor(arg?: CoursesCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
