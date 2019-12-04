import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { MasterFile } from 'app/shared/models/master-file';

@Injectable()

export class MasterFileService extends DataService<MasterFile> {
    constructor(http: HttpClient) {
        super('masterfile', http);
    }
}

