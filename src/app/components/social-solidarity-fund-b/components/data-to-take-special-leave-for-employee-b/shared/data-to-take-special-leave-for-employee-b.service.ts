import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DataToTakeSpecialLeaveForEmployeeB } from 'app/shared/models/data-to-take-special-leave-for-employee-b';

@Injectable()

export class DataToTakeSpecialLeaveForEmployeeBService extends DataService<DataToTakeSpecialLeaveForEmployeeB> {
    constructor(http: HttpClient) {
        super('datatotakespecialleaveforemployeeb', http);
    }
}

