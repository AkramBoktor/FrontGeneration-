import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataOfEducationalStudy } from 'app/shared/models/data-of-educational-study';

@Injectable()

export class DataOfEducationalStudyService extends DataService<DataOfEducationalStudy> {
    constructor(http: HttpClient) {
        super('dataofeducationalstudy', http);
    }
}

