import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CareerPrograms } from 'app/shared/models/career-programs';

@Injectable()

export class CareerProgramsService extends DataService<CareerPrograms> {
    constructor(http: HttpClient) {
        super('careerprograms', http);
    }
}

