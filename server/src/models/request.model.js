/* eslint-disable no-console */

// request-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'tbRequest2';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.integer('RequestID');
        table.datetime('ReqTime');
        table.integer('CustomerID');
        table.string('CustomerName');
        table.integer('CompanyID');
        table.string('CompanyName');
        table.string('CustomerContract');
        table.string('CustomerEmail');
        table.string('ContractChannel');
        table.string('RequestChannel');
        table.string('LocationDetail');
        table.integer('BuildingID');
        table.string('BuildingName');
        table.integer('JobTypeID');
        table.string('JobTypeDescription');
        table.string('Priority');
        table.string('Damage');
        table.string('Description');
        table.integer('UserID');
        table.string('UserName');
        table.datetime('UserTime');
        table.float('TotalSLA');
        table.float('UseTime');
        table.string('Status');
        table.string('DepartmentID');
        table.string('DepartmentName');
        table.string('DivisionID');
        table.string('DivisionName');
        table.datetime('StartTime1');
        table.string('Comment1');
        table.integer('UserID1');
        table.string('UserName1');
        table.integer('ResponsibleID');
        table.string('ResponsibleName');
        table.datetime('StartTime2');
        table.string('Comment2');
        table.integer('UserID2');
        table.string('UserName2');
        table.datetime('StartTime3');
        table.string('Comment3');
        table.integer('UserID3');
        table.string('UserName3');
        table.string('FromRequest');
        table.string('ToRequest');
        table.string('ContractTel');
        table.string('Important');
        table.datetime('LastUpdate');
        table.string('JobLogDescription');
        table.integer('Result3');
        table.integer('RepairBuildingID');
        table.string('RepairBuildingName');
        table.integer('FollowUpCount');
        table.datetime('FollowUpTime');
        table.string('FollowUpDescription');
        table.integer('ZoneID');
        table.string('ZoneCode');
        table.string('CustomerAvailable');
        table.string('CustomerRemark');
        table.integer('RMID');
        table.string('RMName');
        table.integer('CheckPointID');
        table.string('CheckPointName');
        table.string('CheckPointType');
        table.string('CheckPointCode');
        table.string('FloorLevel');
        table.string('TechnicianBelong');
        table.integer('Rate1');
        table.integer('Rate2');
        table.integer('Rate3');
        table.float('RateAvg');
        table.string('RateComment');
        table.datetime('RateDate');
        table.string('RateBy');
        table.datetime('AppointmentStart');
        table.datetime('AppointmentEnd');
        table.integer('TechnicianMainID');
        table.string('TechnicianMainName');
        table.string('DadJobType');
        table.boolean('BookingActive');
        table.integer('BookingCode');
        table.integer('BookingSlotStart');
        table.integer('BookingSlotEnd');
        table.boolean('JobFixed');
        table.datetime('JobFixedDate');
        table.string('JobFixedBy');
        table.boolean('JobAccept');
        table.string('JobAcceptBy');
        table.datetime('JobAcceptDate');
        table.integer('FromCheckPointLogID');
        table.integer('FromReqID');
        table.boolean('AppointmentAllowTechnician');
        table.string('AppointmentBy');
        table.string('FixedDetail');
        table.string('RMComment');
        table.boolean('FixedContinueRequest');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
};
