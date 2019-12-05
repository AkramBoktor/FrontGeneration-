
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SocialWelfareForTheHeirsOfAnEmployee } from 'app/shared/models/social-welfare-for-the-heirs-of-an-employee';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SocialWelfareForTheHeirsOfAnEmployeeEditComponent } from '../social-welfare-for-the-heirs-of-an-employee-edit/social-welfare-for-the-heirs-of-an-employee-edit.component';
import { SocialWelfareForTheHeirsOfAnEmployeeNewComponent } from '../social-welfare-for-the-heirs-of-an-employee-new/social-welfare-for-the-heirs-of-an-employee-new.component';
import { SocialWelfareForTheHeirsOfAnEmployeeViewComponent } from '../social-welfare-for-the-heirs-of-an-employee-view/social-welfare-for-the-heirs-of-an-employee-view.component';
import { SocialWelfareForTheHeirsOfAnEmployeeService } from '../shared/social-welfare-for-the-heirs-of-an-employee.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-social-welfare-for-the-heirs-of-an-employee-list',
  templateUrl: './social-welfare-for-the-heirs-of-an-employee-list.component.html',
  styleUrls: ['./social-welfare-for-the-heirs-of-an-employee-list.component.scss'],
  providers: []
})

export class SocialWelfareForTheHeirsOfAnEmployeeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSocialWelfareForTheHeirsOfAnEmployee: SocialWelfareForTheHeirsOfAnEmployee;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم الشيك ', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ الشيك ', field: 'checkDate' }),
	new GridColumnOptions({ headerName: ' مبلغ الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' رقم شيك الوريث', field: 'heirCheckNo' }),
	new GridColumnOptions({ headerName: ' ت شيك وريث', field: 'heirCheckDate' }),
	new GridColumnOptions({ headerName: ' اسم الوريث', field: 'heirName' }),
	new GridColumnOptions({ headerName: ' المبلغ', field: 'amount' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SocialWelfareForTheHeirsOfAnEmployeeViewComponent,
    editDialogClassType: SocialWelfareForTheHeirsOfAnEmployeeEditComponent,
    newDialogClassType: SocialWelfareForTheHeirsOfAnEmployeeNewComponent,
  });
    constructor(
        injector: Injector,
        public socialWelfareForTheHeirsOfAnEmployeeService: SocialWelfareForTheHeirsOfAnEmployeeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSocialWelfareForTheHeirsOfAnEmployee = new SocialWelfareForTheHeirsOfAnEmployee();

    

    this.searchForm = this.formBuilder.group({
     	checkNumber : [],
	employeeCode : [],
	heirCheckNo : [],
	heirName : []
    });

     
  }

  getSocialWelfareForTheHeirsOfAnEmployeePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SocialWelfareForTheHeirsOfAnEmployee[]> => {
    return this.socialWelfareForTheHeirsOfAnEmployeeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.socialWelfareForTheHeirsOfAnEmployeeService.delete(param.data.id)
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

