import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MasterFilesDepartment } from 'app/shared/models/master-files-department';

@Injectable()

export class MasterFilesDepartmentService extends DataService<MasterFilesDepartment> {
    constructor(http: HttpClient) {
        super('masterfilesdepartment', http);
    }
}

