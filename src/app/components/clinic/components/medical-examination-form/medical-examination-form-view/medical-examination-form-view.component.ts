
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MedicalExaminationForm } from 'app/shared/models/medical-examination-form';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MedicalExaminationFormService } from '../shared/medical-examination-form.service';

@Component({
  selector: 'app-medical-examination-form-view',
  templateUrl: './medical-examination-form-view.component.html',
  styleUrls: ['./medical-examination-form-view.component.scss'],
  providers: []
})

export class MedicalExaminationFormViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMedicalExaminationForm: MedicalExaminationForm;
  medicalExaminationFormForm: FormGroup;

  private diseasesTypesService: LookupService;
private detectionTypesService: LookupService;

  
diseaseCodeSelectOptions: MaterialSelectOptions;
examinationTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMedicalExaminationFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<MedicalExaminationFormViewComponent>,
    public medicalExaminationFormService: MedicalExaminationFormService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMedicalExaminationForm = this.selectedMedicalExaminationFormDialog.data || this.selectedMedicalExaminationForm;

    
	this.diseaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.diseasesTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المرض',
	});

	this.examinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.detectionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الكشف',
	});


    this.medicalExaminationFormForm = this.formBuilder.group({
      
  diagnosis : [this.selectedMedicalExaminationForm.diagnosis],
  examinationDate : [this.selectedMedicalExaminationForm.examinationDate],
  patientName : [this.selectedMedicalExaminationForm.patientName],
  patientCode : [this.selectedMedicalExaminationForm.patientCode],
  doctorName : [this.selectedMedicalExaminationForm.doctorName],
  doctorCode : [this.selectedMedicalExaminationForm.doctorCode],
  diseaseCode : [this.selectedMedicalExaminationForm.diseaseCode],
  examinationType : [this.selectedMedicalExaminationForm.examinationType]
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
    return this.medicalExaminationFormForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.medicalExaminationFormForm.controls)) {
      this.medicalExaminationFormForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.diseasesTypesService = new LookupService('diseasestypes', this.http);
this.detectionTypesService = new LookupService('detectiontypes', this.http);
  }
}

