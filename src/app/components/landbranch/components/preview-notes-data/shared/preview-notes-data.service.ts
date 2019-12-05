import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PreviewNotesData } from 'app/shared/models/preview-notes-data';

@Injectable()

export class PreviewNotesDataService extends DataService<PreviewNotesData> {
    constructor(http: HttpClient) {
        super('previewnotesdata', http);
    }
}

