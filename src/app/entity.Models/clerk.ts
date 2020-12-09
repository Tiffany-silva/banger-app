export enum Role {
    CLERK = "clerk",
    HIRER = "hirer"
}


export class Clerk {
    
    private _clerkId:string='';
    private _name:string='';
    private _email:string='';
    private _password:string='';
    private _role:Role=Role.CLERK;
    constructor(){
   }
   public get role(){
       return this._role;
   }

    public get name(){
        return this._name;
    }
    public set name(name:string){
        this._name=name;
    }

    public get id(){
        return this._clerkId;
    }

    public set id(id:string){
        this._clerkId=id;
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

}