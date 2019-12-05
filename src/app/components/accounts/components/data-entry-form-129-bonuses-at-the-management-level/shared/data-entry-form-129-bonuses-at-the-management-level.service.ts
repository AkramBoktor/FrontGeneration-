import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataEntryForm129BonusesAtTheManagementLevel } from 'app/shared/models/data-entry-form-129-bonuses-at-the-management-level';

@Injectable()

export class DataEntryForm129BonusesAtTheManagementLevelService extends DataService<DataEntryForm129BonusesAtTheManagementLevel> {
    constructor(http: HttpClient) {
        super('dataentryform129bonusesatthemanagementlevel', http);
    }
}

