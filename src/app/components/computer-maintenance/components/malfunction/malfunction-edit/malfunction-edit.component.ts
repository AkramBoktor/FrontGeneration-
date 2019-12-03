
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Malfunction } from 'app/shared/models/malfunction';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MalfunctionService } from '../shared/malfunction.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-malfunction-edit',
  templateUrl: './malfunction-edit.component.html',
  styleUrls: ['./malfunction-edit.component.scss'],
  providers: []
})

export class MalfunctionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMalfunction: Malfunction;
  malfunctionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMalfunctionDialog: any,
    @Optional() public dialogRef: MatDialogRef<MalfunctionEditComponent>,
    public malfunctionService: MalfunctionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMalfunction = new Malfunction();
    this.selectedMalfunction = this.selectedMalfunctionDialog.data || this.selectedMalfunction;

    

    this.malfunctionForm = this.formBuilder.group({
      
  id : [this.selectedMalfunction.id]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.malfunctionService.update(this.malfunctionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.malfunctionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.malfunctionForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
