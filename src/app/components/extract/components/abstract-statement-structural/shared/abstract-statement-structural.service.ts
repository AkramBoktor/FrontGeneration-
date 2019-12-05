import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AbstractStatementStructural } from 'app/shared/models/abstract-statement-structural';

@Injectable()

export class AbstractStatementStructuralService extends DataService<AbstractStatementStructural> {
    constructor(http: HttpClient) {
        super('abstractstatementstructural', http);
    }
}

