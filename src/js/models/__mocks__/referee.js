// Mock Class
export default class Referee {
  static lastLogin = {};

  constructor(first_name,last_name,idNum, phone, email) {
    this.first_name = first_name;
    this.last_name=last_name;
    this.idNum = idNum;
    this.phone=phone;
    this.email = email;
  }
  
    // Methods
  
    // Static methods
    static getById(idNum) {
      if(idNum==='208112557' || idNum==='13'){
        return true
      }
      return false
    }
  
  static async updateData(first_name,last_name,idNum,phone,email) {
  }


  static getMyGames(idUserNum){}
  /*
  static async getAll() {
      const referees = await RefereeData.findAll()
      console.log(referees)
      return referees.map(fromData)
  }
  static fromData(refereeData) {
      return new Referee(refereeData.first_name,refereeData.last_name, refereeData.id,refereeData.phone ,refereeData.email)
  }*/
  static async addEventsGame(idNum,gameId,event){
    if(gameId===1 && idNum=='13'){
      return true
    }
    return false
  }
  
  static async addReferee(first_name,last_name,idNum,phone,email){
    if(idNum==='12')
      return 'Failed referee user already exists'
    return null
  }  

} 