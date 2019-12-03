import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PreparingStudentsInClassrooms } from 'app/shared/models/preparing-students-in-classrooms';

@Injectable()

export class PreparingStudentsInClassroomsService extends DataService<PreparingStudentsInClassrooms> {
    constructor(http: HttpClient) {
        super('preparingstudentsinclassrooms', http);
    }
}

