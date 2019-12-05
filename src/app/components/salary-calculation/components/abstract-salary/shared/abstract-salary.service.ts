import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AbstractSalary } from 'app/shared/models/abstract-salary';

@Injectable()

export class AbstractSalaryService extends DataService<AbstractSalary> {
    constructor(http: HttpClient) {
        super('abstractsalary', http);
    }
}

