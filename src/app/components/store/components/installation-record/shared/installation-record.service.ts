import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { InstallationRecord } from 'app/shared/models/installation-record';

@Injectable()

export class InstallationRecordService extends DataService<InstallationRecord> {
    constructor(http: HttpClient) {
        super('installationrecord', http);
    }
}

