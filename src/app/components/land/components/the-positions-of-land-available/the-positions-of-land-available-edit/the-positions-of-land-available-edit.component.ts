
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ThePositionsOfLandAvailable } from 'app/shared/models/the-positions-of-land-available';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ThePositionsOfLandAvailableService } from '../shared/the-positions-of-land-available.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-positions-of-land-available-edit',
  templateUrl: './the-positions-of-land-available-edit.component.html',
  styleUrls: ['./the-positions-of-land-available-edit.component.scss'],
  providers: []
})

export class ThePositionsOfLandAvailableEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThePositionsOfLandAvailable: ThePositionsOfLandAvailable;
  thePositionsOfLandAvailableForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private documentCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('documentCode', { static: true }) DocumentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThePositionsOfLandAvailableDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThePositionsOfLandAvailableEditComponent>,
    public thePositionsOfLandAvailableService: ThePositionsOfLandAvailableService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThePositionsOfLandAvailable = new ThePositionsOfLandAvailable();
    this.selectedThePositionsOfLandAvailable = this.selectedThePositionsOfLandAvailableDialog.data || this.selectedThePositionsOfLandAvailable;

    
	this.documentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستند',
	});


    this.thePositionsOfLandAvailableForm = this.formBuilder.group({
      
  id : [this.selectedThePositionsOfLandAvailable.id],
  projectCode : [this.selectedThePositionsOfLandAvailable.projectCode, [ Validators.required ]],
  documentCode : [this.selectedThePositionsOfLandAvailable.documentCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.thePositionsOfLandAvailableService.update(this.thePositionsOfLandAvailableForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.thePositionsOfLandAvailableService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.thePositionsOfLandAvailableForm.get(name);
  }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}
