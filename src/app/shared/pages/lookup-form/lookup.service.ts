import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/shared/async-services/data.service';
import { Constants } from 'app/shared/config/constants';
import { LookupModel } from 'app/shared/models/controls/lookup.model';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export class LookupService extends DataService<LookupModel> {

  constructor(url, http: HttpClient) {
    super(url, http);
    this.urlPrefix = Constants.baseLookupUrl;
  }
  
  public getAll(): Observable<LookupModel[]> {
    console.log(`${this.urlPrefix}/${ this.url }`);
    return this.httpClient
      .get<LookupModel[]>(`${this.urlPrefix}/${ this.url }`);
  }

  public getAllWithFilter(filter: any): Observable<LookupModel[]> {
    console.log( filter.filter);
    return this.httpClient
      .post<LookupModel[]>(`${this.urlPrefix}/${ this.url }/search`, JSON.stringify(filter.filter));
  }

}
