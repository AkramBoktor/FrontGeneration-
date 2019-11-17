
 export class PermissionFlashbackBookToTheBodyStore {
    id: number;
    
	bookNumber: string;
	bookNumberBranch: string;
	returnAuthorizationDate: Date;
	outgoingLibraryRecipient: string;
	employeeCode: string;
	extensionNumber: string;
	generalNumber: string;
	bookTitle: string;
	constructor(arg?: PermissionFlashbackBookToTheBodyStore) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
