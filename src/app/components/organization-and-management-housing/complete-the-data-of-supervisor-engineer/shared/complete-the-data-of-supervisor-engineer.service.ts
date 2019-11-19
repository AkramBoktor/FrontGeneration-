import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CompleteTheDataOfSupervisorEngineer } from 'app/shared/models/complete-the-data-of-supervisor-engineer';

@Injectable()

export class CompleteTheDataOfSupervisorEngineerService extends DataService<CompleteTheDataOfSupervisorEngineer> {
    constructor(http: HttpClient) {
        super('completethedataofsupervisorengineer', http);
    }
}

