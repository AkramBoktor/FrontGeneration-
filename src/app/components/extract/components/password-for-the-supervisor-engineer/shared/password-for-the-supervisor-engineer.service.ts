import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PasswordForTheSupervisorEngineer } from 'app/shared/models/password-for-the-supervisor-engineer';

@Injectable()

export class PasswordForTheSupervisorEngineerService extends DataService<PasswordForTheSupervisorEngineer> {
    constructor(http: HttpClient) {
        super('passwordforthesupervisorengineer', http);
    }
}

