
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IntroducingTaxCodeForTheGovernorate } from 'app/shared/models/introducing-tax-code-for-the-governorate';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingTaxCodeForTheGovernorateEditComponent } from '../introducing-tax-code-for-the-governorate-edit/introducing-tax-code-for-the-governorate-edit.component';
import { IntroducingTaxCodeForTheGovernorateNewComponent } from '../introducing-tax-code-for-the-governorate-new/introducing-tax-code-for-the-governorate-new.component';
import { IntroducingTaxCodeForTheGovernorateViewComponent } from '../introducing-tax-code-for-the-governorate-view/introducing-tax-code-for-the-governorate-view.component';
import { IntroducingTaxCodeForTheGovernorateService } from '../shared/introducing-tax-code-for-the-governorate.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-introducing-tax-code-for-the-governorate-list',
  templateUrl: './introducing-tax-code-for-the-governorate-list.component.html',
  styleUrls: ['./introducing-tax-code-for-the-governorate-list.component.scss'],
  providers: []
})

export class IntroducingTaxCodeForTheGovernorateListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIntroducingTaxCodeForTheGovernorate: IntroducingTaxCodeForTheGovernorate;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المامورية', field: 'mamoriaCode' }),
	new GridColumnOptions({ headerName: 'مسمي المامورية', field: 'mamoriaName' }),
	new GridColumnOptions({ headerName: 'كود المحافظة', field: 'governorateCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IntroducingTaxCodeForTheGovernorateViewComponent,
    editDialogClassType: IntroducingTaxCodeForTheGovernorateEditComponent,
    newDialogClassType: IntroducingTaxCodeForTheGovernorateNewComponent,
  });
    constructor(
        injector: Injector,
        public introducingTaxCodeForTheGovernorateService: IntroducingTaxCodeForTheGovernorateService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIntroducingTaxCodeForTheGovernorate = new IntroducingTaxCodeForTheGovernorate();

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظة',
	});


    this.searchForm = this.formBuilder.group({
     	mamoriaCode : [],
	mamoriaName : [],
	governorateCode : []
    });

     
  }

  getIntroducingTaxCodesForTheGovernoratesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IntroducingTaxCodeForTheGovernorate[]> => {
    return this.introducingTaxCodeForTheGovernorateService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.introducingTaxCodeForTheGovernorateService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

