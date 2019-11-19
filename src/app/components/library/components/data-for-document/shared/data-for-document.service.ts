import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataForDocument } from 'app/shared/models/data-for-document';

@Injectable()

export class DataForDocumentService extends DataService<DataForDocument> {
    constructor(http: HttpClient) {
        super('datafordocument', http);
    }
}

