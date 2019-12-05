
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PromotionalBonus } from 'app/shared/models/promotional-bonus';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PromotionalBonusEditComponent } from '../promotional-bonus-edit/promotional-bonus-edit.component';
import { PromotionalBonusNewComponent } from '../promotional-bonus-new/promotional-bonus-new.component';
import { PromotionalBonusViewComponent } from '../promotional-bonus-view/promotional-bonus-view.component';
import { PromotionalBonusService } from '../shared/promotional-bonus.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-promotional-bonus-list',
  templateUrl: './promotional-bonus-list.component.html',
  styleUrls: ['./promotional-bonus-list.component.scss'],
  providers: []
})

export class PromotionalBonusListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private bonusesService: LookupService;

  
bounceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bounceType', { static: true }) BounceTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPromotionalBonus: PromotionalBonus;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'السنه', field: 'year' }),
	new GridColumnOptions({ headerName: 'الاجر الوظيفي', field: 'employmentSalary' }),
	new GridColumnOptions({ headerName: 'القيمه', field: 'amount' }),
	new GridColumnOptions({ headerName: 'النسبه', field: 'ratio' }),
	new GridColumnOptions({ headerName: 'رقم القرار', field: 'decisionNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ القرار', field: 'decisionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الاستحقاق', field: 'dueDate' }),
	new GridColumnOptions({ headerName: 'الاجر الوظيفي بعد العلاوه', field: 'employmentSalaryWithBonus' }),
	new GridColumnOptions({ headerName: 'الدرجه الماليه', field: 'financialDegree' }),
	new GridColumnOptions({ headerName: 'العلاوه', field: 'bonus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PromotionalBonusViewComponent,
    editDialogClassType: PromotionalBonusEditComponent,
    newDialogClassType: PromotionalBonusNewComponent,
  });
    constructor(
        injector: Injector,
        public promotionalBonusService: PromotionalBonusService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPromotionalBonus = new PromotionalBonus();

    
	this.bounceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.bonusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العلاوة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	bounceAmount : [],
	bounceType : []
    });

     
  }

  getPromotionalBonusPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PromotionalBonus[]> => {
    return this.promotionalBonusService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.promotionalBonusService.delete(param.data.id)
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
    this.bonusesService = new LookupService('bonuses', this.http);
  }
}

