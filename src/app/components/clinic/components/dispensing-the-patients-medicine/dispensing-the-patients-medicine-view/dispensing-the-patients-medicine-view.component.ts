
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DispensingThePatientsMedicine } from 'app/shared/models/dispensing-the-patients-medicine';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DispensingThePatientsMedicineService } from '../shared/dispensing-the-patients-medicine.service';

@Component({
  selector: 'app-dispensing-the-patients-medicine-view',
  templateUrl: './dispensing-the-patients-medicine-view.component.html',
  styleUrls: ['./dispensing-the-patients-medicine-view.component.scss'],
  providers: []
})

export class DispensingThePatientsMedicineViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDispensingThePatientsMedicine: DispensingThePatientsMedicine;
  dispensingThePatientsMedicineForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDispensingThePatientsMedicineDialog: any,
    @Optional() public dialogRef: MatDialogRef<DispensingThePatientsMedicineViewComponent>,
    public dispensingThePatientsMedicineService: DispensingThePatientsMedicineService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDispensingThePatientsMedicine = this.selectedDispensingThePatientsMedicineDialog.data || this.selectedDispensingThePatientsMedicine;

    

    this.dispensingThePatientsMedicineForm = this.formBuilder.group({
      
  doctorName : [this.selectedDispensingThePatientsMedicine.doctorName],
  patientName : [this.selectedDispensingThePatientsMedicine.patientName],
  date : [this.selectedDispensingThePatientsMedicine.date],
  drugCode : [this.selectedDispensingThePatientsMedicine.drugCode],
  number : [this.selectedDispensingThePatientsMedicine.number],
  notes : [this.selectedDispensingThePatientsMedicine.notes],
  doctorCode : [this.selectedDispensingThePatientsMedicine.doctorCode],
  patientCode : [this.selectedDispensingThePatientsMedicine.patientCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.dispensingThePatientsMedicineForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dispensingThePatientsMedicineForm.controls)) {
      this.dispensingThePatientsMedicineForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

