
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DrugsInformation } from 'app/shared/models/drugs-information';
import { switchMap } from 'rxjs/operators';
import { DrugsInformationService } from '../shared/drugs-information.service';




@Component({
  selector: 'app-drugs-information-edit',
  templateUrl: './drugs-information-edit.component.html',
  styleUrls: ['./drugs-information-edit.component.scss'],
  providers: []
})

export class DrugsInformationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDrugsInformation: DrugsInformation;
  drugsInformationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDrugsInformationDialog: any,
    @Optional() public dialogRef: MatDialogRef<DrugsInformationEditComponent>,
    public drugsInformationService: DrugsInformationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDrugsInformation = new DrugsInformation();
    this.selectedDrugsInformation = this.selectedDrugsInformationDialog.data || this.selectedDrugsInformation;

    

    this.drugsInformationForm = this.formBuilder.group({
      
  id : [this.selectedDrugsInformation.id],
  drugName : [this.selectedDrugsInformation.drugName, [ Validators.required ]],
  drugCode : [this.selectedDrugsInformation.drugCode, [ Validators.required ]],
  quantity : [this.selectedDrugsInformation.quantity, [ Validators.required ]],
  supplier : [this.selectedDrugsInformation.supplier, [ Validators.required ]],
  storagePlace : [this.selectedDrugsInformation.storagePlace, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.drugsInformationService.update(this.drugsInformationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.drugsInformationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.drugsInformationForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
