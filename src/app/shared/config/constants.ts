export class Constants {
  // public static baseApiUrl = 'https://securingangularappscourse-api.azurewebsites.net/api/';
  public static baseUrl = 'http://localhost:8002';
  public static baseApiUrl = Constants.baseUrl + `/api`;
  public static baseAttachmentUrl = `http://localhost:50382/api`;


  // public static baseLookupUrl = 'http://localhost:3913/api';
  // public static baseLookupUrl = 'http://192.168.137.36:9999/api';
  public static baseLookupUrl = 'http://mahmoudexcel-001-site1.btempurl.com/api';

  public static baseOdataUrl = Constants.baseUrl + `/odata`;
  public static stsAuthority = 'http://localhost:9989';
  public static clientRoot = 'http://localhost:4200';

  public static actionView = 'view';
  public static actionEdit = 'edit';
  public static actionNew = 'new';
}
