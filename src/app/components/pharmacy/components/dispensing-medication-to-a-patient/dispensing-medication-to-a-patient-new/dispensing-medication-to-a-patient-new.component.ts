
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DispensingMedicationToAPatient } from 'app/shared/models/dispensing-medication-to-a-patient';
import { switchMap } from 'rxjs/operators';
import { DispensingMedicationToAPatientService } from '../shared/dispensing-medication-to-a-patient.service';


@Component({
  selector: 'app-dispensing-medication-to-a-patient-new',
  templateUrl: './dispensing-medication-to-a-patient-new.component.html',
  styleUrls: ['./dispensing-medication-to-a-patient-new.component.scss'],
  providers: [
    ]
})

export class DispensingMedicationToAPatientNewComponent extends AppBaseComponent implements OnInit {
  dispensingMedicationToAPatientForm: FormGroup;
  @Input() selectedDispensingMedicationToAPatient: DispensingMedicationToAPatient;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DispensingMedicationToAPatientNewComponent>,
    public dispensingMedicationToAPatientService: DispensingMedicationToAPatientService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDispensingMedicationToAPatient = new DispensingMedicationToAPatient();

    

    this.dispensingMedicationToAPatientForm = this.formBuilder.group({
     
  id : [0],
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
    this.dispensingMedicationToAPatientService.create(this.dispensingMedicationToAPatientForm.value)
        .pipe(switchMap(x => {
			return this.dispensingMedicationToAPatientService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dispensingMedicationToAPatientForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
