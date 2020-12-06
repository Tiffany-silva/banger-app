export enum AEType {
    SATNAV ="satnav",
    BABY_SEATS = "baby seats",
    WINE_CHILLER ="wine chiller"
}

export class AdditionalEquipment {
    private additionalEquipmentId:string='';
    private _aetype!: AEType;
    private _quantity:number= 0;

    constructor(){
    }

    public get id():string{
        return this.additionalEquipmentId;
    }

    public set id(id:string){
        this.additionalEquipmentId=id;
    }

    public set aEType(aetype:AEType){
        this._aetype=aetype;
    }

    public get aEType(){
        return this._aetype;
    }

    public set quantity(quantity:number){
        this._quantity=quantity;
    }

    public get quantity(){
        return this._quantity;
    }

}