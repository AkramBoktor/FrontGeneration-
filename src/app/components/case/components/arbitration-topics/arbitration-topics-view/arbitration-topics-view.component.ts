
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ArbitrationTopics } from 'app/shared/models/arbitration-topics';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ArbitrationTopicsService } from '../shared/arbitration-topics.service';

@Component({
  selector: 'app-arbitration-topics-view',
  templateUrl: './arbitration-topics-view.component.html',
  styleUrls: ['./arbitration-topics-view.component.scss'],
  providers: []
})

export class ArbitrationTopicsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedArbitrationTopics: ArbitrationTopics;
  arbitrationTopicsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedArbitrationTopicsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ArbitrationTopicsViewComponent>,
    public arbitrationTopicsService: ArbitrationTopicsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedArbitrationTopics = this.selectedArbitrationTopicsDialog.data || this.selectedArbitrationTopics;

    

    this.arbitrationTopicsForm = this.formBuilder.group({
      
  code : [this.selectedArbitrationTopics.code],
  name : [this.selectedArbitrationTopics.name]
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
    return this.arbitrationTopicsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.arbitrationTopicsForm.controls)) {
      this.arbitrationTopicsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

