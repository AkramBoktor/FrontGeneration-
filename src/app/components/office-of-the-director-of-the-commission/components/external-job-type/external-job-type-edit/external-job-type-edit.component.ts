
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExternalJobType } from 'app/shared/models/external-job-type';
import { switchMap } from 'rxjs/operators';
import { ExternalJobTypeService } from '../shared/external-job-type.service';




@Component({
  selector: 'app-external-job-type-edit',
  templateUrl: './external-job-type-edit.component.html',
  styleUrls: ['./external-job-type-edit.component.scss'],
  providers: []
})

export class ExternalJobTypeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalJobType: ExternalJobType;
  externalJobTypeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalJobTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalJobTypeEditComponent>,
    public externalJobTypeService: ExternalJobTypeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalJobType = new ExternalJobType();
    this.selectedExternalJobType = this.selectedExternalJobTypeDialog.data || this.selectedExternalJobType;

    

    this.externalJobTypeForm = this.formBuilder.group({
      
  id : [this.selectedExternalJobType.id],
  eexternaljobcode : [this.selectedExternalJobType.eexternaljobcode, [ Validators.required ]],
  externaljobname : [this.selectedExternalJobType.externaljobname, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.externalJobTypeService.update(this.externalJobTypeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.externalJobTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.externalJobTypeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
