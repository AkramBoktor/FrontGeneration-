
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AvailableLandPosition } from 'app/shared/models/available-land-position';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AvailableLandPositionService } from '../shared/available-land-position.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-available-land-position-edit',
  templateUrl: './available-land-position-edit.component.html',
  styleUrls: ['./available-land-position-edit.component.scss'],
  providers: []
})

export class AvailableLandPositionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAvailableLandPosition: AvailableLandPosition;
  availableLandPositionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private documentCodesService: LookupService;

  
documentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('document', { static: true }) DocumentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAvailableLandPositionDialog: any,
    @Optional() public dialogRef: MatDialogRef<AvailableLandPositionEditComponent>,
    public availableLandPositionService: AvailableLandPositionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAvailableLandPosition = new AvailableLandPosition();
    this.selectedAvailableLandPosition = this.selectedAvailableLandPositionDialog.data || this.selectedAvailableLandPosition;

    
	this.documentSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المستند',
	});


    this.availableLandPositionForm = this.formBuilder.group({
      
  id : [this.selectedAvailableLandPosition.id],
  projectCode : [this.selectedAvailableLandPosition.projectCode, [ Validators.required ]],
  document : [this.selectedAvailableLandPosition.document, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.availableLandPositionService.update(this.availableLandPositionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.availableLandPositionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.availableLandPositionForm.get(name);
  }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}
