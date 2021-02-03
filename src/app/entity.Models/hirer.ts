import { Role } from './clerk';

export class Hirer {

    private _id!: string;
    private _firstName:string='';
    private _lastName:string='';
    private _nic:string='';
    private _email:string='';
    private _photoURL:string='';
    private _confirmIdentity:boolean= false;
    private _drivingLicenseURL:string='';
    private _address:string='';
    private _dob!: Date;
    private _password:string='';
    private _blackListed:boolean=false;
    private _role:Role=Role.HIRER;
    constructor(){
   }

   public get role(){
       return this._role;
   }

  get nic(): string {
    return this._nic;
  }

  set nic(value: string) {
    this._nic = value;
  }

  public get firstName(){
        return this._firstName;
    }
    public set firstName(firstname:string){
        this._firstName=firstname;
    }

    public set lastName(lastname:string){
        this._lastName=lastname;
    }
    public get lastName(){
        return this._lastName;
    }

    public get photoURL(){
        return this._photoURL;
    }

    public set photoURL(photoURL:string){
        this._photoURL=photoURL;
    }

    public get confirmIdentity(){
        return this._confirmIdentity;
    }

    public set confirmIdentity(confirmIdentity:boolean){
        this._confirmIdentity=confirmIdentity;
    }

    public set drivingLicenseURL(drivingLicenseURL:string){
        this._drivingLicenseURL=drivingLicenseURL;
    }

    public get drivingLicenseURL(){
        return this._drivingLicenseURL;
    }

    public set address(address:string){
        this._address=address;
    }

    public get address(){
        return this._address;
    }

    public get id(){
        return this._id;
    }

    public set id(id:string){
        this._id=id;
    }

    public set dob(dob:Date){
        this._dob=dob;
    }

    public get dob(){
        return this._dob;
    }

    public set email(email:string){
        this._email=email;
    }

    public get email(){
        return this._email;
    }

    public get password(){
        return this._password;
    }

    public set password(password:string){
        this._password=password;
    }

    public get blackListed(){
        return this._blackListed;
    }

    public set BlackListed(blackListed:boolean){
        this._blackListed=blackListed;
    }

}
