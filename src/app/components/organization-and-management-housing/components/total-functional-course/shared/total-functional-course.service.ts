import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TotalFunctionalCourse } from 'app/shared/models/total-functional-course';

@Injectable()

export class TotalFunctionalCourseService extends DataService<TotalFunctionalCourse> {
    constructor(http: HttpClient) {
        super('totalfunctionalcourse', http);
    }
}

