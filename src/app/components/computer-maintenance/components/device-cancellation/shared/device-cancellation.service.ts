import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { DeviceCancellation } from 'app/shared/models/device-cancellation';

@Injectable()

export class DeviceCancellationService extends DataService<DeviceCancellation> {
    constructor(http: HttpClient) {
        super('devicecancellation', http);
    }
}

