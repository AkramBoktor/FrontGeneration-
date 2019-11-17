import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EndingTheAssignmentOfTheCaseToTheLawyer } from 'app/shared/models/ending-the-assignment-of-the-case-to-the-lawyer';

@Injectable()

export class EndingTheAssignmentOfTheCaseToTheLawyerService extends DataService<EndingTheAssignmentOfTheCaseToTheLawyer> {
    constructor(http: HttpClient) {
        super('endingtheassignmentofthecasetothelawyer', http);
    }
}

