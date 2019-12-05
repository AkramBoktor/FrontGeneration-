import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ExaminationAndOtherTest } from 'app/shared/models/examination-and-other-test';

@Injectable()

export class ExaminationAndOtherTestService extends DataService<ExaminationAndOtherTest> {
    constructor(http: HttpClient) {
        super('examinationandothertest', http);
    }
}

