export enum Status {
    CANCELLED ="Cancelled",
    BOOKED = "Booked",
    EXTENDED = "Extended",
    COMPLETED= "Completed",
    PICKED = "Picked",
    PENDING ="Pending"
}

export class Booking {
    private _id?:string;
    private _hirerId:string='';
    private _additionalEquipment!: string[];
    private _vehicleID: string='';
    private _status: Status;
    private _bookedDate!: Date;
    private _returnDate!: Date;
    private _totalPrice:Number=0;
    private _licenseNumber:String;

    constructor(){
    }


  get bookedDate(): Date {
    return this._bookedDate;
  }

  set bookedDate(value: Date) {
    this._bookedDate = value;
  }

  get licenseNumber(): String {
    return this._licenseNumber;
  }

  set licenseNumber(value: String) {
    this._licenseNumber = value;
  }

  public get hirerId():string{
        return this._hirerId;
    }

    public set hirerId(userID:string){
        this._hirerId=userID;
    }

    public set additionalEquipment(additionalEquipment:string[]){
        this._additionalEquipment=additionalEquipment;
    }

    public get additionalEquipment():string[]{
        return this._additionalEquipment;
    }

    public set status(status:Status){
        this._status=status;
    }

    public get status(){
        return this._status;
    }

    public set returnDate(returnDate:Date){
        this._returnDate=returnDate;
    }

    public get returnDate():Date{
        return this._returnDate;
    }

    public get bookingDate():Date{
        return this._bookedDate;
    }

    public set bookingDate(bookedDate:Date){
        this._bookedDate=bookedDate;
    }
    public get id(){
        return this._id;
    }

    public set id(id:string){
        this._id=id;
    }

    public set totalPrice(total:Number){
        this._totalPrice=total;
    }

    public get totalPrice():Number{
        return this._totalPrice;
    }

    public set vehicleID(vehicleid:string){
        this._vehicleID=vehicleid;
    }

    public get vehicleID(){
        return this._vehicleID;
    }


}
