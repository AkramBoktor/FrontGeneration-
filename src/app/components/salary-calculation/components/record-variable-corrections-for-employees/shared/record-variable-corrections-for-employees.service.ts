import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordVariableCorrectionsForEmployees } from 'app/shared/models/record-variable-corrections-for-employees';

@Injectable()

export class RecordVariableCorrectionsForEmployeesService extends DataService<RecordVariableCorrectionsForEmployees> {
    constructor(http: HttpClient) {
        super('recordvariablecorrectionsforemployees', http);
    }
}

