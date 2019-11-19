
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MembershipData } from 'app/shared/models/membership-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MembershipDataEditComponent } from '../membership-data-edit/membership-data-edit.component';
import { MembershipDataNewComponent } from '../membership-data-new/membership-data-new.component';
import { MembershipDataViewComponent } from '../membership-data-view/membership-data-view.component';
import { MembershipDataService } from '../shared/membership-data.service';

@Component({
  selector: 'app-membership-data-list',
  templateUrl: './membership-data-list.component.html',
  styleUrls: ['./membership-data-list.component.scss'],
  providers: []
})

export class MembershipDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedMembershipData: MembershipData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المؤظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'الوظيفه', field: 'job' }),
	new GridColumnOptions({ headerName: 'الرقم القومى', field: 'iDNumber' }),
	new GridColumnOptions({ headerName: 'محل الاقامه', field: 'residence' }),
	new GridColumnOptions({ headerName: 'عدد الاسهم', field: 'sharesNumber' }),
	new GridColumnOptions({ headerName: 'رقم العضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ العضويه', field: 'membershipDate' }),
	new GridColumnOptions({ headerName: 'قيمه الربح', field: 'profitAmount' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MembershipDataViewComponent,
    editDialogClassType: MembershipDataEditComponent,
    newDialogClassType: MembershipDataNewComponent,
  });
    constructor(
        injector: Injector,
        public membershipDataService: MembershipDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMembershipData = new MembershipData();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	sharesNumber : [],
	membershipNumber : [],
	membershipDate : []
    });

     
  }

  getMembershipDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MembershipData[]> => {
    return this.membershipDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.membershipDataService.delete(param.data.id)
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

