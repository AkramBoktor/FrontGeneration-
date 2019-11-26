import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { FenceFile } from 'app/shared/models/fence-file';

@Injectable()

export class FenceFileService extends DataService<FenceFile> {
    constructor(http: HttpClient) {
        super('fencefile', http);
    }
}

