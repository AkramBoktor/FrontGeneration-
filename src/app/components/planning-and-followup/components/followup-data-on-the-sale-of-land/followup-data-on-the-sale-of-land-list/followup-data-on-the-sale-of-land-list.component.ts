
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FollowupDataOnTheSaleOfLand } from 'app/shared/models/followup-data-on-the-sale-of-land';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowupDataOnTheSaleOfLandEditComponent } from '../followup-data-on-the-sale-of-land-edit/followup-data-on-the-sale-of-land-edit.component';
import { FollowupDataOnTheSaleOfLandNewComponent } from '../followup-data-on-the-sale-of-land-new/followup-data-on-the-sale-of-land-new.component';
import { FollowupDataOnTheSaleOfLandViewComponent } from '../followup-data-on-the-sale-of-land-view/followup-data-on-the-sale-of-land-view.component';
import { FollowupDataOnTheSaleOfLandService } from '../shared/followup-data-on-the-sale-of-land.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-followup-data-on-the-sale-of-land-list',
  templateUrl: './followup-data-on-the-sale-of-land-list.component.html',
  styleUrls: ['./followup-data-on-the-sale-of-land-list.component.scss'],
  providers: []
})

export class FollowupDataOnTheSaleOfLandListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedFollowupDataOnTheSaleOfLand: FollowupDataOnTheSaleOfLand;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '   رقم الارض', field: 'landNumber' }),
	new GridColumnOptions({ headerName: 'القسم', field: 'department' }),
	new GridColumnOptions({ headerName: ' القرية', field: 'village' }),
	new GridColumnOptions({ headerName: ' المساحة الكلية', field: 'totalArea' }),
	new GridColumnOptions({ headerName: '  مالك الحالي', field: 'currentOwner' }),
	new GridColumnOptions({ headerName: ' المرحلة', field: 'stage' }),
	new GridColumnOptions({ headerName: ' النموذج', field: 'sample' }),
	new GridColumnOptions({ headerName: '  الاعتماد', field: 'accreditation' }),
	new GridColumnOptions({ headerName: 'المستندات', field: 'documents' }),
	new GridColumnOptions({ headerName: '  التسكين', field: 'soothing' }),
	new GridColumnOptions({ headerName: ' الخطة', field: 'plan' }),
	new GridColumnOptions({ headerName: 'جهة التفاوض', field: 'negotiationEntity' }),
	new GridColumnOptions({ headerName: ' مفاوضات البيع', field: 'saleNegotiations' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FollowupDataOnTheSaleOfLandViewComponent,
    editDialogClassType: FollowupDataOnTheSaleOfLandEditComponent,
    newDialogClassType: FollowupDataOnTheSaleOfLandNewComponent,
  });
    constructor(
        injector: Injector,
        public followupDataOnTheSaleOfLandService: FollowupDataOnTheSaleOfLandService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFollowupDataOnTheSaleOfLand = new FollowupDataOnTheSaleOfLand();

    

    this.searchForm = this.formBuilder.group({
     	landNumber : [],
	department : [],
	village : [],
	negotiationEntity : [],
	saleNegotiations : []
    });

     
  }

  getFollowupDataOnTheSaleOfLandPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FollowupDataOnTheSaleOfLand[]> => {
    return this.followupDataOnTheSaleOfLandService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.followupDataOnTheSaleOfLandService.delete(param.data.id)
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

