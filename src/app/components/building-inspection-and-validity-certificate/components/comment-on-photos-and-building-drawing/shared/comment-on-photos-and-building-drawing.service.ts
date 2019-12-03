import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/async-services/data.service';
import { CommentOnPhotosAndBuildingDrawing } from 'app/shared/models/comment-on-photos-and-building-drawing';

@Injectable()

export class CommentOnPhotosAndBuildingDrawingService extends DataService<CommentOnPhotosAndBuildingDrawing> {
    constructor(http: HttpClient) {
        super('commentonphotosandbuildingdrawing', http);
    }
}

