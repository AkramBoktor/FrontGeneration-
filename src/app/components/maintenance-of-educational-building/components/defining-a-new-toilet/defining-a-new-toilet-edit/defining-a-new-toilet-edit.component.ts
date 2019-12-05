
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DefiningANewToilet } from 'app/shared/models/defining-a-new-toilet';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DefiningANewToiletService } from '../shared/defining-a-new-toilet.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-defining-a-new-toilet-edit',
  templateUrl: './defining-a-new-toilet-edit.component.html',
  styleUrls: ['./defining-a-new-toilet-edit.component.scss'],
  providers: []
})

export class DefiningANewToiletEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDefiningANewToilet: DefiningANewToilet;
  definingANewToiletForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDefiningANewToiletDialog: any,
    @Optional() public dialogRef: MatDialogRef<DefiningANewToiletEditComponent>,
    public definingANewToiletService: DefiningANewToiletService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDefiningANewToilet = new DefiningANewToilet();
    this.selectedDefiningANewToilet = this.selectedDefiningANewToiletDialog.data || this.selectedDefiningANewToilet;

    

    this.definingANewToiletForm = this.formBuilder.group({
      
  id : [this.selectedDefiningANewToilet.id],
  toiletCode : [this.selectedDefiningANewToilet.toiletCode, [ Validators.required ]],
  toiletModel : [this.selectedDefiningANewToilet.toiletModel, [ Validators.required ]],
  productionDate : [this.selectedDefiningANewToilet.productionDate, [ Validators.required ]],
  manufacturerCode : [this.selectedDefiningANewToilet.manufacturerCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.definingANewToiletService.update(this.definingANewToiletForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.definingANewToiletService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.definingANewToiletForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
