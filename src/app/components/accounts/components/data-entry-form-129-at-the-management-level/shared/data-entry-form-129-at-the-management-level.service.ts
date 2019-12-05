import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataEntryForm129AtTheManagementLevel } from 'app/shared/models/data-entry-form-129-at-the-management-level';

@Injectable()

export class DataEntryForm129AtTheManagementLevelService extends DataService<DataEntryForm129AtTheManagementLevel> {
    constructor(http: HttpClient) {
        super('dataentryform129atthemanagementlevel', http);
    }
}

