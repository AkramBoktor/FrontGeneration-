import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CoursesCode } from 'app/shared/models/courses-code';

@Injectable()

export class CoursesCodeService extends DataService<CoursesCode> {
    constructor(http: HttpClient) {
        super('coursescode', http);
    }
}

