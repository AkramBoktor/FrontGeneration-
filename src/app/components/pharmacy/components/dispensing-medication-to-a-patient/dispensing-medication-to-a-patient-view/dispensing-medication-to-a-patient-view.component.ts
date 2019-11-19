
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DispensingMedicationToAPatient } from 'app/shared/models/dispensing-medication-to-a-patient';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DispensingMedicationToAPatientService } from '../shared/dispensing-medication-to-a-patient.service';

@Component({
  selector: 'app-dispensing-medication-to-a-patient-view',
  templateUrl: './dispensing-medication-to-a-patient-view.component.html',
  styleUrls: ['./dispensing-medication-to-a-patient-view.component.scss'],
  providers: []
})

export class DispensingMedicationToAPatientViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDispensingMedicationToAPatient: DispensingMedicationToAPatient;
  dispensingMedicationToAPatientForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDispensingMedicationToAPatientDialog: any,
    @Optional() public dialogRef: MatDialogRef<DispensingMedicationToAPatientViewComponent>,
    public dispensingMedicationToAPatientService: DispensingMedicationToAPatientService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDispensingMedicationToAPatient = this.selectedDispensingMedicationToAPatientDialog.data || this.selectedDispensingMedicationToAPatient;

    

    this.dispensingMedicationToAPatientForm = this.formBuilder.group({
      
  doctorCode : [this.selectedDispensingMedicationToAPatient.doctorCode],
  patientCode : [this.selectedDispensingMedicationToAPatient.patientCode],
  day : [this.selectedDispensingMedicationToAPatient.day],
  drugCode : [this.selectedDispensingMedicationToAPatient.drugCode],
  number : [this.selectedDispensingMedicationToAPatient.number],
  pharmacistCode : [this.selectedDispensingMedicationToAPatient.pharmacistCode],
  notes : [this.selectedDispensingMedicationToAPatient.notes],
  doctorName : [this.selectedDispensingMedicationToAPatient.doctorName],
  patientName : [this.selectedDispensingMedicationToAPatient.patientName],
  pharmacistName : [this.selectedDispensingMedicationToAPatient.pharmacistName],
  drugName : [this.selectedDispensingMedicationToAPatient.drugName]
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
    return this.dispensingMedicationToAPatientForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dispensingMedicationToAPatientForm.controls)) {
      this.dispensingMedicationToAPatientForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

