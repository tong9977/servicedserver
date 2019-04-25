// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class technicianBelong extends Model {

  static get tableName() {
    return 'tbTechnicianBelong';
  }

  //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'TechnicianBelongID';
  }

  //Add New สำหรับคำนวณ ตัวอย่าง function ชื่อ total ผลลัพธ์ได้ column total
  static get virtualAttributes() {
    return [];
  }


  $beforeInsert() {
    
  }

  $beforeUpdate() {
   
  }
}

module.exports = function (app) {
  return technicianBelong;
};
