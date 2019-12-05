
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AnnualPlan2 } from 'app/shared/models/annual-plan-2';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AnnualPlan2EditComponent } from '../annual-plan-2-edit/annual-plan-2-edit.component';
import { AnnualPlan2NewComponent } from '../annual-plan-2-new/annual-plan-2-new.component';
import { AnnualPlan2ViewComponent } from '../annual-plan-2-view/annual-plan-2-view.component';
import { AnnualPlan2Service } from '../shared/annual-plan-2.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-annual-plan-2-list',
  templateUrl: './annual-plan-2-list.component.html',
  styleUrls: ['./annual-plan-2-list.component.scss'],
  providers: []
})

export class AnnualPlan2ListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedAnnualPlan2: AnnualPlan2;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم الخطة الخمسية', field: 'fiveYearplanNumber' }),
	new GridColumnOptions({ headerName: '  عدد المشاريع ', field: 'projectsNumber' }),
	new GridColumnOptions({ headerName: 'سنة الخطه', field: 'pLanYear' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AnnualPlan2ViewComponent,
    editDialogClassType: AnnualPlan2EditComponent,
    newDialogClassType: AnnualPlan2NewComponent,
  });
    constructor(
        injector: Injector,
        public annualPlan2Service: AnnualPlan2Service) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAnnualPlan2 = new AnnualPlan2();

    

    this.searchForm = this.formBuilder.group({
     	fiveYearplanNumber : []
    });

     
  }

  getAnnualPlan2PaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AnnualPlan2[]> => {
    return this.annualPlan2Service.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.annualPlan2Service.delete(param.data.id)
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

