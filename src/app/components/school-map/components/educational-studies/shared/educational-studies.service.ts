import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EducationalStudies } from 'app/shared/models/educational-studies';

@Injectable()

export class EducationalStudiesService extends DataService<EducationalStudies> {
    constructor(http: HttpClient) {
        super('educationalstudies', http);
    }
}

