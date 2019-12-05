import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { EmployeesPerformanceEvaluation } from 'app/shared/models/employees-performance-evaluation';

@Injectable()

export class EmployeesPerformanceEvaluationService extends DataService<EmployeesPerformanceEvaluation> {
    constructor(http: HttpClient) {
        super('employeesperformanceevaluation', http);
    }
}

