import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { HolderOfCourse } from 'app/shared/models/holder-of-course';

@Injectable()

export class HolderOfCourseService extends DataService<HolderOfCourse> {
    constructor(http: HttpClient) {
        super('holderofcourse', http);
    }
}

