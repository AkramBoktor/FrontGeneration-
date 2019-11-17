
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DispensingThePatientsMedicine } from 'app/shared/models/dispensing-the-patients-medicine';
import { switchMap } from 'rxjs/operators';
import { DispensingThePatientsMedicineService } from '../shared/dispensing-the-patients-medicine.service';




@Component({
  selector: 'app-dispensing-the-patients-medicine-edit',
  templateUrl: './dispensing-the-patients-medicine-edit.component.html',
  styleUrls: ['./dispensing-the-patients-medicine-edit.component.scss'],
  providers: []
})

export class DispensingThePatientsMedicineEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDispensingThePatientsMedicine: DispensingThePatientsMedicine;
  dispensingThePatientsMedicineForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDispensingThePatientsMedicineDialog: any,
    @Optional() public dialogRef: MatDialogRef<DispensingThePatientsMedicineEditComponent>,
    public dispensingThePatientsMedicineService: DispensingThePatientsMedicineService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDispensingThePatientsMedicine = new DispensingThePatientsMedicine();
    this.selectedDispensingThePatientsMedicine = this.selectedDispensingThePatientsMedicineDialog.data || this.selectedDispensingThePatientsMedicine;

    

    this.dispensingThePatientsMedicineForm = this.formBuilder.group({
      
  id : [this.selectedDispensingThePatientsMedicine.id],
  doctorName : [this.selectedDispensingThePatientsMedicine.doctorName, [ ]],
  patientName : [this.selectedDispensingThePatientsMedicine.patientName, [ ]],
  date : [this.selectedDispensingThePatientsMedicine.date, [ Validators.required ]],
  drugCode : [this.selectedDispensingThePatientsMedicine.drugCode, [ Validators.required ]],
  number : [this.selectedDispensingThePatientsMedicine.number, [ Validators.required ]],
  notes : [this.selectedDispensingThePatientsMedicine.notes, [ Validators.required ]],
  doctorCode : [this.selectedDispensingThePatientsMedicine.doctorCode, [ Validators.required ]],
  patientCode : [this.selectedDispensingThePatientsMedicine.patientCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dispensingThePatientsMedicineService.update(this.dispensingThePatientsMedicineForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dispensingThePatientsMedicineService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dispensingThePatientsMedicineForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
