import { Component, EventEmitter, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { AuthorizeClaims } from 'app/shared/config/authorize-config';
import { AuthorizeClaimsService } from 'app/shared/services/authorize-claims.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid-action-buttons',
  templateUrl: './grid-action-buttons.component.html',
  styleUrls: ['./grid-action-buttons.component.scss'],
  providers: [AuthorizeClaimsService]
})
export class GridActionButtonsComponent implements OnInit, AgRendererComponent {

  authorizeClaims: AuthorizeClaims;
  moduleName: string;
  private params: any;
  buttonClick: EventEmitter<any> = new EventEmitter();

  refresh(params: any): boolean {
    return true;
  }
  agInit(params: any): void {
    this.params = params;
  }

  onDelete(): void {
    this.params.delete(this.params);
  }
  onView(): void {
    this.params.view(this.params);
  }
  onEdit(): void {
    this.params.edit(this.params);
  }
  constructor(private authorizeClaimsService: AuthorizeClaimsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.moduleName = name ? name : this.activatedRoute.snapshot.data['moduleName'];
    this.authorizeClaims = this.authorizeClaimsService.getModuleClaims(this.moduleName);
  }
}

