import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpResponseHandler {
  constructor(
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  public onCatch(response: any, source: Observable<any>): Observable<any> {
    console.log(response);
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden();
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 500:
        this.handleServerError();
        break;

      default:
        break;
    }

    return throwError(response);
  }

  /**
   * Shows notification errors when server response status is 401
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        const bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError();
      }
    } else {
      this.handleServerError();
    }
  }

  /**
   * Shows notification errors when server response status is 401 and redirects user to login page
   *
   * @param responseBody
   */
  private handleUnauthorized(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    // let unauthorizedEndpoints: Array<string> = this.configService.get('notifications')
    //   .unauthorizedEndpoints;

    // unauthorizedEndpoints = unauthorizedEndpoints.filter(
    //   endpoint => this.getRelativeUrl(responseBody.url) === endpoint
    // );
    // this.router.navigate(['/login']);

    // if (unauthorizedEndpoints.length) {
    //   this.notificationsService
    //   this.notificationsService.info(
    //     'Info',
    //     this.translateService.instant('ServerError401'),
    //     this.configService.get('notifications').options
    //   );
    // }
    this.notificationsService.info(
          'Info',
          'ServerError401'
        );
  }

  /**
   * Shows notification errors when server response status is 403
   */
  private handleForbidden(): void {
    this.notificationsService.error(
      'error',
      'ServerError403',
    );
    this.router.navigate(['/login']);
  }

  /**
   * Shows notification errors when server response status is 404
   *
   * @param responseBody
   */
  private handleNotFound(responseBody: any): void {
      this.showNotificationError('ErrorNotificationTitle', 'ServerError404');
  }

  /**
   * Shows notification errors when server response status is 500
   */
  private handleServerError(): void {
    this.showNotificationError('ErrorNotificationTitle', 'ServerError500');
  }

  /**
   * Parses server response and shows notification errors with translated messages
   *
   * @param response
   */
  private handleErrorMessages(response: any): void {
    if (!response) {
      return;
    }

    for (const key of Object.keys(response)) {
      if (Array.isArray(response[key])) {
        response[key].forEach(value =>
          this.showNotificationError('Error', value)
        );
      } else {
        this.showNotificationError('Error', response[key]);
      }
    }
  }

  /**
   * Returns relative url from the absolute path
   *
   * @param responseBody
   * @returns {string}
   */
  // private getRelativeUrl(url: string): string {
  //   return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '');
  // }

  /**
   * Shows error notification with given title and message
   *
   * @param title
   * @param message
   */
  private showNotificationError(title: string, message: string): void {
    this.notificationsService.error(
      title,
      message
    );
  }

  protected handleError(error: any) {

    var applicationError = error.headers.get('Application-Error');

    // either application-error in header or model error in body
    if (applicationError) {
      return throwError(applicationError);
    }

    var modelStateErrors: string = '';

      // for now just concatenate the error descriptions, alternative we could simply pass the entire error response upstream
      for (var key in error.error) {
        if (error.error[key]) modelStateErrors += error.error[key].description + '\n';
      }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return throwError(modelStateErrors || 'Server error');
  }

}
