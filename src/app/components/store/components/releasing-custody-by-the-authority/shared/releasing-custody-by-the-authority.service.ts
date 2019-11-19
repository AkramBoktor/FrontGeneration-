import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { ReleasingCustodyByTheAuthority } from 'app/shared/models/releasing-custody-by-the-authority';

@Injectable()

export class ReleasingCustodyByTheAuthorityService extends DataService<ReleasingCustodyByTheAuthority> {
    constructor(http: HttpClient) {
        super('releasingcustodybytheauthority', http);
    }
}

