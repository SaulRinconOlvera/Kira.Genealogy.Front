import { BaseModel } from '../base/base-mode';

export class Person extends BaseModel<string> {
    name : string;
    firstFamilyName : string;
    secondFamilyName : string;
    bornDate : Date;
    bornDateTimeSpan : number;
    isBornDateExactly : boolean;
    isAlive : boolean;
    deathDate : Date;
    deathDateTimeSpan : number;
    isDeathDateExactly : boolean;
    gender : number;
    phoneNumber : string;
    sharePhone : boolean;
    mailAddress : string;
    shareMailAddress : boolean;
    bornCity : string;
    isBornCityExactly : boolean;
    treeId : string;
    hasPhoto : boolean;
    personalImage : string;
}
