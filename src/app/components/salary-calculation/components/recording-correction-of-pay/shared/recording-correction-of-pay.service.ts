import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordingCorrectionOfPay } from 'app/shared/models/recording-correction-of-pay';

@Injectable()

export class RecordingCorrectionOfPayService extends DataService<RecordingCorrectionOfPay> {
    constructor(http: HttpClient) {
        super('recordingcorrectionofpay', http);
    }
}

