import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DocumentsFolder } from 'app/shared/models/documents-folder';

@Injectable()

export class DocumentsFolderService extends DataService<DocumentsFolder> {
    constructor(http: HttpClient) {
        super('documentsfolder', http);
    }
}

