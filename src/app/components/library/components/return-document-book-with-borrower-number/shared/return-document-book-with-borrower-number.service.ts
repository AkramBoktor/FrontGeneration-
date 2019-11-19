import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ReturnDocumentBookWithBorrowerNumber } from 'app/shared/models/return-document-book-with-borrower-number';

@Injectable()

export class ReturnDocumentBookWithBorrowerNumberService extends DataService<ReturnDocumentBookWithBorrowerNumber> {
    constructor(http: HttpClient) {
        super('returndocumentbookwithborrowernumber', http);
    }
}

