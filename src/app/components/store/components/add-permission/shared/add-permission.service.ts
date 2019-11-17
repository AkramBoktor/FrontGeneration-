import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { AddPermission } from 'app/shared/models/add-permission';

@Injectable()

export class AddPermissionService extends DataService<AddPermission> {
    constructor(http: HttpClient) {
        super('addpermission', http);
    }
}

