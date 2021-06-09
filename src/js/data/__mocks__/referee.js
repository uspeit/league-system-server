function flattenObj(obj, parent, res = {}) {
    for (let key in obj) {
        let propName = key;
        if (typeof obj[key] == 'object') {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}
// Mock
class RefereeData {
    static saved = null;
    static used_first_name = ['moshi','aiman'];
    static used_last_name = ['levi','saied'];
    static used_idNum = ['1','208112557'];
    static used_phone=['123456','0546493454']
    static used_email=['moshe@','aiman@']

    constructor(first_name,last_name,idNum, phone, email) {
        this.first_name = first_name;
        this.last_name=last_name;
        this.idNum = idNum;
        this.phone=phone;
        this.email = email;
    }

    save() {
        RefereeData.saved = this;
        let index=RefereeData.used_idNum.indexOf(this.idNum);
        if(index>=0){
            RefereeData.used_first_name[index]=this.first_name;
            RefereeData.used_last_name[index]=this.last_name;
            RefereeData.used_idNum[index]=this.idNum;
            RefereeData.used_phone[index]=this.phone;
            RefereeData.used_email[index]=this.email;
        }
        else{
            RefereeData.used_first_name.push(this.first_name);
            RefereeData.used_last_name.push(this.last_name);
            RefereeData.used_idNum.push(this.idNum);
            RefereeData.used_phone.push(this.phone);
            RefereeData.used_email.push(this.email);
        }
    }
    
    static async create(referee) {
        return new RefereeData(referee.first_name,referee.last_name,referee.idNum,referee.phone, referee.email);
    }

    static async findOne(query) {
        const params = flattenObj(query);
        if (params.idNum) {
            let index = this.used_idNum.indexOf(params.idNum);
            if (index>=0)
                return new RefereeData(RefereeData.used_first_name[index],RefereeData.used_last_name[index],RefereeData.used_idNum[index],RefereeData.used_phone[index],RefereeData.used_email[index])
        }
        return null
    }

    static destroy() {
        this.used_first_name = ['moshi','aiman'];
        this.used_last_name = ['levi','saied'];
        this.used_idNum = ['1','208112557'];
        this.used_phone=['123456','0546493454']
        this.used_email=['moshe@','aiman@']
    }
}

export default RefereeData