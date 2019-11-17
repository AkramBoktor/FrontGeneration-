
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DispensingThePatientsMedicine } from 'app/shared/models/dispensing-the-patients-medicine';
import { switchMap } from 'rxjs/operators';
import { DispensingThePatientsMedicineService } from '../shared/dispensing-the-patients-medicine.service';


@Component({
  selector: 'app-dispensing-the-patients-medicine-new',
  templateUrl: './dispensing-the-patients-medicine-new.component.html',
  styleUrls: ['./dispensing-the-patients-medicine-new.component.scss'],
  providers: [
    ]
})

export class DispensingThePatientsMedicineNewComponent extends AppBaseComponent implements OnInit {
  dispensingThePatientsMedicineForm: FormGroup;
  @Input() selectedDispensingThePatientsMedicine: DispensingThePatientsMedicine;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DispensingThePatientsMedicineNewComponent>,
    public dispensingThePatientsMedicineService: DispensingThePatientsMedicineService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDispensingThePatientsMedicine = new DispensingThePatientsMedicine();

    

    this.dispensingThePatientsMedicineForm = this.formBuilder.group({
     
  id : [0],
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
    this.dispensingThePatientsMedicineService.create(this.dispensingThePatientsMedicineForm.value)
        .pipe(switchMap(x => {
			return this.dispensingThePatientsMedicineService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dispensingThePatientsMedicineForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
