import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { IntroducingExceptionForBranchesEngineer } from 'app/shared/models/introducing-exception-for-branches-engineer';

@Injectable()

export class IntroducingExceptionForBranchesEngineerService extends DataService<IntroducingExceptionForBranchesEngineer> {
    constructor(http: HttpClient) {
        super('introducingexceptionforbranchesengineer', http);
    }
}

