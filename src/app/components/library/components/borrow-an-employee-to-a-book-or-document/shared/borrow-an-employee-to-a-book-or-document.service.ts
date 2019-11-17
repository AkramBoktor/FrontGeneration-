import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { BorrowAnEmployeeToABookOrDocument } from 'app/shared/models/borrow-an-employee-to-a-book-or-document';

@Injectable()

export class BorrowAnEmployeeToABookOrDocumentService extends DataService<BorrowAnEmployeeToABookOrDocument> {
    constructor(http: HttpClient) {
        super('borrowanemployeetoabookordocument', http);
    }
}

