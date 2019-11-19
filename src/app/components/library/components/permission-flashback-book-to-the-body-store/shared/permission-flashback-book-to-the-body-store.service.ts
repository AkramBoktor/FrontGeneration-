import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { PermissionFlashbackBookToTheBodyStore } from 'app/shared/models/permission-flashback-book-to-the-body-store';

@Injectable()

export class PermissionFlashbackBookToTheBodyStoreService extends DataService<PermissionFlashbackBookToTheBodyStore> {
    constructor(http: HttpClient) {
        super('permissionflashbackbooktothebodystore', http);
    }
}

