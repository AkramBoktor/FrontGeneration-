import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DefineANewModel } from 'app/shared/models/define-a-new-model';

@Injectable()

export class DefineANewModelService extends DataService<DefineANewModel> {
    constructor(http: HttpClient) {
        super('defineanewmodel', http);
    }
}

