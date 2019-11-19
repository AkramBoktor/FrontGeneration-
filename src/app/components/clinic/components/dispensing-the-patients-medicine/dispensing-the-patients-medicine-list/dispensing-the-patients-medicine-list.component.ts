
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { DispensingThePatientsMedicine } from 'app/shared/models/dispensing-the-patients-medicine';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DispensingThePatientsMedicineEditComponent } from '../dispensing-the-patients-medicine-edit/dispensing-the-patients-medicine-edit.component';
import { DispensingThePatientsMedicineNewComponent } from '../dispensing-the-patients-medicine-new/dispensing-the-patients-medicine-new.component';
import { DispensingThePatientsMedicineViewComponent } from '../dispensing-the-patients-medicine-view/dispensing-the-patients-medicine-view.component';
import { DispensingThePatientsMedicineService } from '../shared/dispensing-the-patients-medicine.service';

@Component({
  selector: 'app-dispensing-the-patients-medicine-list',
  templateUrl: './dispensing-the-patients-medicine-list.component.html',
  styleUrls: ['./dispensing-the-patients-medicine-list.component.scss'],
  providers: []
})

export class DispensingThePatientsMedicineListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDispensingThePatientsMedicine: DispensingThePatientsMedicine;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم الموظف الطبيب', field: 'doctorName' }),
	new GridColumnOptions({ headerName: 'اسم الموظف المريض', field: 'patientName' }),
	new GridColumnOptions({ headerName: 'تاريخ الصرف', field: 'date' }),
	new GridColumnOptions({ headerName: 'الدواء المصروف', field: 'drugCode' }),
	new GridColumnOptions({ headerName: 'العدد', field: 'number' }),
	new GridColumnOptions({ headerName: 'كود الموظف الطبيب', field: 'doctorCode' }),
	new GridColumnOptions({ headerName: 'كود الموظف المريض', field: 'patientCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DispensingThePatientsMedicineViewComponent,
    editDialogClassType: DispensingThePatientsMedicineEditComponent,
    newDialogClassType: DispensingThePatientsMedicineNewComponent,
  });
    constructor(
        injector: Injector,
        public dispensingThePatientsMedicineService: DispensingThePatientsMedicineService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDispensingThePatientsMedicine = new DispensingThePatientsMedicine();

    

    this.searchForm = this.formBuilder.group({
     	date : [],
	drugCode : [],
	doctorCode : [],
	patientCode : []
    });

     
  }

  getDispensingThePatientsMedicinePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DispensingThePatientsMedicine[]> => {
    return this.dispensingThePatientsMedicineService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dispensingThePatientsMedicineService.delete(param.data.id)
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

