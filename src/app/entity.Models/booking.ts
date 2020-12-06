export enum Status {
    AVAILABLE ="available",
    UNAVAILABLE="unavailable",
    BOOKED = "booked",
    EXTENDED = "extended",
    RETURNED= "returned"
}

export class Booking {
    private bookingId:string='';
    private _userID:string='';
    private _additionalEquipment!: string;
    private _vehicleID: string='';
    private _status: Status = Status.AVAILABLE;
    private _bookedDate!: Date;
    private _returnDate!: Date;
    private _totalPrice:Number=0;
    constructor(){
    }

    public get userID():string{
        return this._userID;
    }

    public set userID(userID:string){
        this._userID=userID;
    }

    public set additionalEquipment(additionalEquipment:string){
        this._additionalEquipment=additionalEquipment;
    }

    public get additionalEquipment():string{
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

    public get bookedDate():Date{
        return this._bookedDate;
    }

    public set bookedDate(bookedDate:Date){
        this._bookedDate=bookedDate;
    }
    public get id(){
        return this.bookingId;
    }

    public set id(id:string){
        this.bookingId=id;
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