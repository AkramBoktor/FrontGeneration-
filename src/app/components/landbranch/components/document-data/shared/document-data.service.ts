import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DocumentData } from 'app/shared/models/document-data';

@Injectable()

export class DocumentDataService extends DataService<DocumentData> {
    constructor(http: HttpClient) {
        super('documentdata', http);
    }
}

