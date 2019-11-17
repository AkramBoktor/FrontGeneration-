
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Disclaimer } from 'app/shared/models/disclaimer';
import { switchMap } from 'rxjs/operators';
import { DisclaimerService } from '../shared/disclaimer.service';




@Component({
  selector: 'app-disclaimer-edit',
  templateUrl: './disclaimer-edit.component.html',
  styleUrls: ['./disclaimer-edit.component.scss'],
  providers: []
})

export class DisclaimerEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDisclaimer: Disclaimer;
  disclaimerForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDisclaimerDialog: any,
    @Optional() public dialogRef: MatDialogRef<DisclaimerEditComponent>,
    public disclaimerService: DisclaimerService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDisclaimer = new Disclaimer();
    this.selectedDisclaimer = this.selectedDisclaimerDialog.data || this.selectedDisclaimer;

    

    this.disclaimerForm = this.formBuilder.group({
      
  id : [this.selectedDisclaimer.id],
  employeeCode : [this.selectedDisclaimer.employeeCode, [ Validators.required ]],
  disclaimerDate : [this.selectedDisclaimer.disclaimerDate, [ ]],
  employeeName : [this.selectedDisclaimer.employeeName, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.disclaimerService.update(this.disclaimerForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.disclaimerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.disclaimerForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
