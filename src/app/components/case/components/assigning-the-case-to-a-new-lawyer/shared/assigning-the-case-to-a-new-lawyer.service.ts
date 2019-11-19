import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AssigningTheCaseToANewLawyer } from 'app/shared/models/assigning-the-case-to-a-new-lawyer';

@Injectable()

export class AssigningTheCaseToANewLawyerService extends DataService<AssigningTheCaseToANewLawyer> {
    constructor(http: HttpClient) {
        super('assigningthecasetoanewlawyer', http);
    }
}

