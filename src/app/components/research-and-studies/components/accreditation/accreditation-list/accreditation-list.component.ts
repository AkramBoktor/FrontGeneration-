
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Accreditation } from 'app/shared/models/accreditation';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AccreditationEditComponent } from '../accreditation-edit/accreditation-edit.component';
import { AccreditationNewComponent } from '../accreditation-new/accreditation-new.component';
import { AccreditationViewComponent } from '../accreditation-view/accreditation-view.component';
import { AccreditationService } from '../shared/accreditation.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-accreditation-list',
  templateUrl: './accreditation-list.component.html',
  styleUrls: ['./accreditation-list.component.scss'],
  providers: []
})

export class AccreditationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedAccreditation: Accreditation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الاعتماد', field: 'accreditationCode' }),
	new GridColumnOptions({ headerName: 'اسم الاعتماد', field: 'accreditationName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AccreditationViewComponent,
    editDialogClassType: AccreditationEditComponent,
    newDialogClassType: AccreditationNewComponent,
  });
    constructor(
        injector: Injector,
        public accreditationService: AccreditationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAccreditation = new Accreditation();

    

    this.searchForm = this.formBuilder.group({
     	accreditationCode : [],
	accreditationName : []
    });

     
  }

  getAccreditationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Accreditation[]> => {
    return this.accreditationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.accreditationService.delete(param.data.id)
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

