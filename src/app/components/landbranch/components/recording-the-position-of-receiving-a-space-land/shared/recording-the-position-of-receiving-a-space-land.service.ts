import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { RecordingThePositionOfReceivingASpaceLand } from 'app/shared/models/recording-the-position-of-receiving-a-space-land';

@Injectable()

export class RecordingThePositionOfReceivingASpaceLandService extends DataService<RecordingThePositionOfReceivingASpaceLand> {
    constructor(http: HttpClient) {
        super('recordingthepositionofreceivingaspaceland', http);
    }
}

