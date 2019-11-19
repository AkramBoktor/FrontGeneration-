import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ConditionsNotebookData } from 'app/shared/models/conditions-notebook-data';

@Injectable()

export class ConditionsNotebookDataService extends DataService<ConditionsNotebookData> {
    constructor(http: HttpClient) {
        super('conditionsnotebookdata', http);
    }
}

