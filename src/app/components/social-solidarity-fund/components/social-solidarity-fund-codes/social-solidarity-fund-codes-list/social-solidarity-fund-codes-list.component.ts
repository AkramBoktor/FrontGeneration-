
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SocialSolidarityFundCodes } from 'app/shared/models/social-solidarity-fund-codes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SocialSolidarityFundCodesEditComponent } from '../social-solidarity-fund-codes-edit/social-solidarity-fund-codes-edit.component';
import { SocialSolidarityFundCodesNewComponent } from '../social-solidarity-fund-codes-new/social-solidarity-fund-codes-new.component';
import { SocialSolidarityFundCodesViewComponent } from '../social-solidarity-fund-codes-view/social-solidarity-fund-codes-view.component';
import { SocialSolidarityFundCodesService } from '../shared/social-solidarity-fund-codes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-social-solidarity-fund-codes-list',
  templateUrl: './social-solidarity-fund-codes-list.component.html',
  styleUrls: ['./social-solidarity-fund-codes-list.component.scss'],
  providers: []
})

export class SocialSolidarityFundCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSocialSolidarityFundCodes: SocialSolidarityFundCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'نوع الكود', field: 'codeType' }),
	new GridColumnOptions({ headerName: 'كود البيان', field: 'statementCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SocialSolidarityFundCodesViewComponent,
    editDialogClassType: SocialSolidarityFundCodesEditComponent,
    newDialogClassType: SocialSolidarityFundCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public socialSolidarityFundCodesService: SocialSolidarityFundCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSocialSolidarityFundCodes = new SocialSolidarityFundCodes();

    

    this.searchForm = this.formBuilder.group({
     	codeType : [],
	statementCode : []
    });

     
  }

  getSocialSolidarityFundCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SocialSolidarityFundCodes[]> => {
    return this.socialSolidarityFundCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.socialSolidarityFundCodesService.delete(param.data.id)
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

