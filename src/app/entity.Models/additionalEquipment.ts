export enum AEType {
    SATNAV ="satnav",
    BABY_SEATS = "baby seats",
    WINE_CHILLER ="wine chiller"
}

export class AdditionalEquipment {
    private _id:string='';
    private _aetype: string='';
    private _quantity:number= 0;

    constructor(){
    }

    public get id():string{
        return this._id;
    }

    public set id(id:string){
        this._id=id;
    }

    public set equipmentType(aetype:string){
        this._aetype=aetype;
    }

    public get equipmentType(){
        return this._aetype;
    }

    public set quantity(quantity:number){
        this._quantity=quantity;
    }

    public get quantity(){
        return this._quantity;
    }

}