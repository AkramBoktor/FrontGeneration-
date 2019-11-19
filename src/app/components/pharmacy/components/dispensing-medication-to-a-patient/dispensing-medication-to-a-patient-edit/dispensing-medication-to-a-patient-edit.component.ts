
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DispensingMedicationToAPatient } from 'app/shared/models/dispensing-medication-to-a-patient';
import { switchMap } from 'rxjs/operators';
import { DispensingMedicationToAPatientService } from '../shared/dispensing-medication-to-a-patient.service';




@Component({
  selector: 'app-dispensing-medication-to-a-patient-edit',
  templateUrl: './dispensing-medication-to-a-patient-edit.component.html',
  styleUrls: ['./dispensing-medication-to-a-patient-edit.component.scss'],
  providers: []
})

export class DispensingMedicationToAPatientEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDispensingMedicationToAPatient: DispensingMedicationToAPatient;
  dispensingMedicationToAPatientForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDispensingMedicationToAPatientDialog: any,
    @Optional() public dialogRef: MatDialogRef<DispensingMedicationToAPatientEditComponent>,
    public dispensingMedicationToAPatientService: DispensingMedicationToAPatientService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDispensingMedicationToAPatient = new DispensingMedicationToAPatient();
    this.selectedDispensingMedicationToAPatient = this.selectedDispensingMedicationToAPatientDialog.data || this.selectedDispensingMedicationToAPatient;

    

    this.dispensingMedicationToAPatientForm = this.formBuilder.group({
      
  id : [this.selectedDispensingMedicationToAPatient.id],
  doctorCode : [this.selectedDispensingMedicationToAPatient.doctorCode, [ Validators.required ]],
  patientCode : [this.selectedDispensingMedicationToAPatient.patientCode, [ Validators.required ]],
  day : [this.selectedDispensingMedicationToAPatient.day, [ Validators.required ]],
  drugCode : [this.selectedDispensingMedicationToAPatient.drugCode, [ Validators.required ]],
  number : [this.selectedDispensingMedicationToAPatient.number, [ Validators.required ]],
  pharmacistCode : [this.selectedDispensingMedicationToAPatient.pharmacistCode, [ Validators.required ]],
  notes : [this.selectedDispensingMedicationToAPatient.notes, [ Validators.required ]],
  doctorName : [this.selectedDispensingMedicationToAPatient.doctorName, [ ]],
  patientName : [this.selectedDispensingMedicationToAPatient.patientName, [ ]],
  pharmacistName : [this.selectedDispensingMedicationToAPatient.pharmacistName, [ ]],
  drugName : [this.selectedDispensingMedicationToAPatient.drugName, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dispensingMedicationToAPatientService.update(this.dispensingMedicationToAPatientForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dispensingMedicationToAPatientService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.dispensingMedicationToAPatientForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
