export default {
  jobStatus: [
    // {
    //   id: "00",
    //   label: "ทุกสถานะ",
    // },
    {
      statusID: "01",
      statusName: "งานใหม่",
    },
    {
      statusID: "02",
      statusName: "ดำเนินการ",
    },
    {
      statusID: "03",
      statusName: "เสร็จสิ้น",
    },
    {
      statusID: "04",
      statusName: "ประเมินแล้ว",
    },
    {
      statusID: "1x",
      statusName: "รอ",
    },
    {
      statusID: "9x",
      statusName: "ยกเลิก",
    },
  ],


  company: [
    {
      id: 1,
      label: "เจ้าหน้าที่ปฏิบัติงาน"
    },
    {
      id: 2,
      label: "ไม่ระบุหน่วยงาน"
    },
    {
      id: 3,
      label: "สำนักงานศาลทรัพย์สินทางปัญญาและการค้าระหว่างประเทศกลาง"
    },
    {
      id: 4,
      label: "สำนักงานศาลรัฐธรรมนูญ"
    }, {
      id: 5,
      label: "สำนักงานปลัดกระทรวงยุติธรรม"
    },
  ],

  RMGroup:[
    {
      id:1,
      label:"Group 1"
    },
    {
      id:2,
      label:"Group 2"
    },
    {
      id:3,
      label:"Group 3"
    },
  ],

  

  repairsStatus:[
    {
      status: false,
      statusName:"ไม่เสร็จ"
    },
    {
      status: true,
      statusName:"เสร็จ"
    },
  ],

  damages:[
    {
      damage:"01",
      damageName:"เป็นอันตรายต่อชีวิตและทรัพย์สิน"
    },
    {
      damage:"02",
      damageName:"เป็นห้องบุคคลสำคัญ"
    },
  ],

  dateChoice:[
    {
      //วันแจ้งซ่อม
      dateChoiceID : "01",
      dateChoiceName:"วันแจ้งซ่อม"
    },
    {
      //วันนัด
      dateChoiceID : "02",
      dateChoiceName:"วันนัด"
    },
    {
      //วันปิดงาน
      dateChoiceID : "03",
      dateChoiceName:"วันปิดงาน"
    }
  ],

}
