
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ArbitrationTopics } from 'app/shared/models/arbitration-topics';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { switchMap } from 'rxjs/operators';
import { ArbitrationTopicsService } from '../shared/arbitration-topics.service';




@Component({
  selector: 'app-arbitration-topics-edit',
  templateUrl: './arbitration-topics-edit.component.html',
  styleUrls: ['./arbitration-topics-edit.component.scss'],
  providers: []
})

export class ArbitrationTopicsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedArbitrationTopics: ArbitrationTopics;
  arbitrationTopicsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedArbitrationTopicsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ArbitrationTopicsEditComponent>,
    public arbitrationTopicsService: ArbitrationTopicsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedArbitrationTopics = new ArbitrationTopics();
    this.selectedArbitrationTopics = this.selectedArbitrationTopicsDialog.data || this.selectedArbitrationTopics;

    

    this.arbitrationTopicsForm = this.formBuilder.group({
      
  id : [this.selectedArbitrationTopics.id],
  code : [this.selectedArbitrationTopics.code, [ Validators.required ]],
  name : [this.selectedArbitrationTopics.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.arbitrationTopicsService.update(this.arbitrationTopicsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.arbitrationTopicsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.arbitrationTopicsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
