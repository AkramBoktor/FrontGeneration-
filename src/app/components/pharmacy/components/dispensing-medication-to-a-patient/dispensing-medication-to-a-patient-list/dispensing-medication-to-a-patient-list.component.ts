
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { DispensingMedicationToAPatient } from 'app/shared/models/dispensing-medication-to-a-patient';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DispensingMedicationToAPatientEditComponent } from '../dispensing-medication-to-a-patient-edit/dispensing-medication-to-a-patient-edit.component';
import { DispensingMedicationToAPatientNewComponent } from '../dispensing-medication-to-a-patient-new/dispensing-medication-to-a-patient-new.component';
import { DispensingMedicationToAPatientViewComponent } from '../dispensing-medication-to-a-patient-view/dispensing-medication-to-a-patient-view.component';
import { DispensingMedicationToAPatientService } from '../shared/dispensing-medication-to-a-patient.service';

@Component({
  selector: 'app-dispensing-medication-to-a-patient-list',
  templateUrl: './dispensing-medication-to-a-patient-list.component.html',
  styleUrls: ['./dispensing-medication-to-a-patient-list.component.scss'],
  providers: []
})

export class DispensingMedicationToAPatientListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDispensingMedicationToAPatient: DispensingMedicationToAPatient;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الطبيب', field: 'doctorCode' }),
	new GridColumnOptions({ headerName: 'كود المريض', field: 'patientCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الصرف', field: 'day' }),
	new GridColumnOptions({ headerName: 'الدواء المصروف', field: 'drugCode' }),
	new GridColumnOptions({ headerName: 'العدد', field: 'number' }),
	new GridColumnOptions({ headerName: 'كود الصيدلى', field: 'pharmacistCode' }),
	new GridColumnOptions({ headerName: 'اسم الطبيب', field: 'doctorName' }),
	new GridColumnOptions({ headerName: 'اسم المريض', field: 'patientName' }),
	new GridColumnOptions({ headerName: 'اسم الصيدلي', field: 'pharmacistName' }),
	new GridColumnOptions({ headerName: 'أسم الدواء', field: 'drugName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DispensingMedicationToAPatientViewComponent,
    editDialogClassType: DispensingMedicationToAPatientEditComponent,
    newDialogClassType: DispensingMedicationToAPatientNewComponent,
  });
    constructor(
        injector: Injector,
        public dispensingMedicationToAPatientService: DispensingMedicationToAPatientService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDispensingMedicationToAPatient = new DispensingMedicationToAPatient();

    

    this.searchForm = this.formBuilder.group({
     	doctorCode : [],
	patientCode : [],
	day : [],
	drugCode : [],
	pharmacistCode : []
    });

     
  }

  getDispensingMedicationToAPatientPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DispensingMedicationToAPatient[]> => {
    return this.dispensingMedicationToAPatientService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dispensingMedicationToAPatientService.delete(param.data.id)
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

