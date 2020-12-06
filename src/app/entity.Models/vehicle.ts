export enum VehicleType {
    HYBRID = "hybrid",
    PETROL = "petrol",
    DIESEL_AUTO = "diesel auto",
    PETROL_MANUAL ="petrol manual"
}

export class Vehicle {
    private _vehicleId:string='';
    private _vehicleName:string='';
    private _vehicleType:VehicleType=VehicleType.DIESEL_AUTO;
    private _quantity:number=0;
    private _price:number=0.0;

    constructor(){
    }

    public get vehicleId(){
        return this._vehicleId;
    }

    public set vehicleName(vehicleName:string){
        this._vehicleName=vehicleName;
    }

    public set vehicleType(vehicleType:VehicleType){
        this._vehicleType=vehicleType;
    }

    public get vehicleType(){
        return this._vehicleType;
    }

    public get vehicleName(){
        return this._vehicleName;
    }

    public set quantity(quantity:number){
        this._quantity=quantity;
    }

    public get quantity(){
        return this._quantity;
    }

    public get price(){
        return this._price;
    }

    public set price(price:number){
        this._price=price;
    }

}