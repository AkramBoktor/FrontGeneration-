
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PublicSiteBoundaryData } from 'app/shared/models/public-site-boundary-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PublicSiteBoundaryDataEditComponent } from '../public-site-boundary-data-edit/public-site-boundary-data-edit.component';
import { PublicSiteBoundaryDataNewComponent } from '../public-site-boundary-data-new/public-site-boundary-data-new.component';
import { PublicSiteBoundaryDataViewComponent } from '../public-site-boundary-data-view/public-site-boundary-data-view.component';
import { PublicSiteBoundaryDataService } from '../shared/public-site-boundary-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-public-site-boundary-data-list',
  templateUrl: './public-site-boundary-data-list.component.html',
  styleUrls: ['./public-site-boundary-data-list.component.scss'],
  providers: []
})

export class PublicSiteBoundaryDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPublicSiteBoundaryData: PublicSiteBoundaryData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الارض', field: 'landCode' }),
	new GridColumnOptions({ headerName: 'متوسط منسوب الموقع', field: 'averageSiteLevel' }),
	new GridColumnOptions({ headerName: 'متوسط منسوب الفناء المقترح', field: 'proposedAverageYardLevel' }),
	new GridColumnOptions({ headerName: 'منسوب أعلى نقطة', field: 'highestPointLevel' }),
	new GridColumnOptions({ headerName: 'منسوب أقل نقطة', field: 'lowestPointLevel' }),
	new GridColumnOptions({ headerName: 'اسم الحد', field: 'borderName' }),
	new GridColumnOptions({ headerName: 'طول الحد', field: 'borderLength' }),
	new GridColumnOptions({ headerName: 'منسوب الجار', field: 'neighborLevel' }),
	new GridColumnOptions({ headerName: 'وصف الجار', field: 'neighborDescription' }),
	new GridColumnOptions({ headerName: 'يوجد جار؟', field: 'hasNeighbor' }),
	new GridColumnOptions({ headerName: 'سور', field: 'fence' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PublicSiteBoundaryDataViewComponent,
    editDialogClassType: PublicSiteBoundaryDataEditComponent,
    newDialogClassType: PublicSiteBoundaryDataNewComponent,
  });
    constructor(
        injector: Injector,
        public publicSiteBoundaryDataService: PublicSiteBoundaryDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPublicSiteBoundaryData = new PublicSiteBoundaryData();

    

    this.searchForm = this.formBuilder.group({
     	landCode : [],
	averageSiteLevel : [],
	proposedAverageYardLevel : [],
	highestPointLevel : [],
	lowestPointLevel : [],
	borderName : [],
	borderLength : []
    });

     
  }

  getPublicSiteBoundaryDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PublicSiteBoundaryData[]> => {
    return this.publicSiteBoundaryDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.publicSiteBoundaryDataService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

