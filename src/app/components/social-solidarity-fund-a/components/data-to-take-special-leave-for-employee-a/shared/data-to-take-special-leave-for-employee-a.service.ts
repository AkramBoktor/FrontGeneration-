import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataToTakeSpecialLeaveForEmployeeA } from 'app/shared/models/data-to-take-special-leave-for-employee-a';

@Injectable()

export class DataToTakeSpecialLeaveForEmployeeAService extends DataService<DataToTakeSpecialLeaveForEmployeeA> {
    constructor(http: HttpClient) {
        super('datatotakespecialleaveforemployeea', http);
    }
}

