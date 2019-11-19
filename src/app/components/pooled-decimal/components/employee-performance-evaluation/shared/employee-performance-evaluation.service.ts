import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeePerformanceEvaluation } from 'app/shared/models/employee-performance-evaluation';

@Injectable()

export class EmployeePerformanceEvaluationService extends DataService<EmployeePerformanceEvaluation> {
    constructor(http: HttpClient) {
        super('employeeperformanceevaluation', http);
    }
}

