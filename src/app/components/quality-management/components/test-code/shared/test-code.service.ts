import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { TestCode } from 'app/shared/models/test-code';

@Injectable()

export class TestCodeService extends DataService<TestCode> {
    constructor(http: HttpClient) {
        super('testcode', http);
    }
}

