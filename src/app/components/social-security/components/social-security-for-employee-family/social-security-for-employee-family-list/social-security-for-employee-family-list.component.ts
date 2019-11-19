
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { SocialSecurityForEmployeeFamily } from 'app/shared/models/social-security-for-employee-family';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SocialSecurityForEmployeeFamilyService } from '../shared/social-security-for-employee-family.service';
import { SocialSecurityForEmployeeFamilyEditComponent } from '../social-security-for-employee-family-edit/social-security-for-employee-family-edit.component';
import { SocialSecurityForEmployeeFamilyNewComponent } from '../social-security-for-employee-family-new/social-security-for-employee-family-new.component';
import { SocialSecurityForEmployeeFamilyViewComponent } from '../social-security-for-employee-family-view/social-security-for-employee-family-view.component';

@Component({
  selector: 'app-social-security-for-employee-family-list',
  templateUrl: './social-security-for-employee-family-list.component.html',
  styleUrls: ['./social-security-for-employee-family-list.component.scss'],
  providers: []
})

export class SocialSecurityForEmployeeFamilyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];
  

  

  

  
  @Input() selectedSocialSecurityForEmployeeFamily: SocialSecurityForEmployeeFamily;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'مسلسل الموظف', field: 'employeeSerial' }),
	new GridColumnOptions({ headerName: 'الرقم التأميني', field: 'insuranceNumber' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'الصفة', field: 'relationship' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SocialSecurityForEmployeeFamilyViewComponent,
    editDialogClassType: SocialSecurityForEmployeeFamilyEditComponent,
    newDialogClassType: SocialSecurityForEmployeeFamilyNewComponent,
  });
    constructor(
        injector: Injector,
        public socialSecurityForEmployeeFamilyService: SocialSecurityForEmployeeFamilyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSocialSecurityForEmployeeFamily = new SocialSecurityForEmployeeFamily();

    

    this.searchForm = this.formBuilder.group({
     	employeeName : [],
	employeeCode : [],
	insuranceNumber : []
    });

     
  }

  getSocialSecurityForEmployeeFamilyPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SocialSecurityForEmployeeFamily[]> => {
    return this.socialSecurityForEmployeeFamilyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.socialSecurityForEmployeeFamilyService.delete(param.data.id)
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

