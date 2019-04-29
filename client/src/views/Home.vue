<template>
  <v-container fill-height fluid grid-list-xl>
    <v-flex md12 lg12>
      <material-card color="orange" title="Admin">
        <!-- <v-flex md12 lg12>
                <div>
                  <button-item @TestEmitEvnet="testEmtiEventFromButton"></button-item>
                </div>
        </v-flex>-->
        <v-layout wrap>
          <v-flex md2 lg2>
            สถานะ
            <v-combobox
              v-model="statusSelect"
              :items="jobStatus"
              item-text="statusName"
              item-value="statusID"
              label="เลือกสถานะงาน"
            ></v-combobox>
          </v-flex>

          <v-flex md4 lg4>
            กรองตามพื้นที่
            <v-combobox
              v-model="companySelect"
              :items="companys"
              item-text="CompanyName"
              item-value="CompanyID"
              label="เลือกหน่วยงาน"
              multiple
            ></v-combobox>
          </v-flex>
          <v-flex md2 lg2>
            กรองตาม RM Group
            <v-combobox
              v-model="RMGroupIDSelect"
              :items="RMGroups"
              item-text="ZoneCode"
              item-value="ZoneID"
              label="เลือก RM Group"
            ></v-combobox>
          </v-flex>
          <v-flex md2 lg2>
            กรองตามทีมช่าง
            <v-combobox
              v-model="technicianBelongSelect"
              :items="technicianBelongs"
              item-text="TechnicianBelongName"
              item-value="TechnicianBelongID"
              label="เลือกทีมช่าง"
            ></v-combobox>
          </v-flex>
          <v-flex md2 lg2>
            กรองตามช่างซ่อมเสร็จ
            <v-combobox
              v-model="jobFixed"
              :items="repairsStatus"
              item-text="statusName"
              item-value="status"
              label="เลือกทีมช่าง"
            ></v-combobox>
          </v-flex>
          <v-flex md3 lg3>
            กรองตามความเร่งด่วน
            <v-combobox
              v-model="damageSelect"
              :items="damages"
              item-text="damageName"
              item-value="damage"
              label="เลือกความเร่งด่วน"
            ></v-combobox>
          </v-flex>
          <v-flex md2 lg2>
            กรองตามวันที่
            <v-combobox
              v-model="dateChoiceSelect"
              :items="dateChoice"
              item-text="dateChoiceName"
              item-value="dateChoiceID"
              label="เลือกวัน"
            ></v-combobox>
          </v-flex>
          <v-flex md2 lg2>
            เริ่ม
            <ejs-datepicker
              style="padding-top:20px;"
              placeholer="วันเริ่ม"
              v-model="startDate"
              :format="dateFormat"
            ></ejs-datepicker>
          </v-flex>
          <v-flex md2 lg2>
            สิ้นสุด
            <ejs-datepicker
              style="padding-top:20px;"
              placeholer="วันสิ้นสุด"
              v-model="endDate"
              :format="dateFormat"
            ></ejs-datepicker>
          </v-flex>

          <v-flex md3 lg3>
            กรองตามเลขใบงาน
            <v-text-field
              label="กรอกเลขใบงาน"
              class="purple-input"
              :value="requestID"
              v-model="requestID"
            />
          </v-flex>
          <v-flex md3 lg3>
            กรองตามรหัสช่าง (ใส่เลขรหัสช่าง)
            <v-text-field
              label="กรอกรหัสช่าง"
              class="purple-input"
              :value="technicianMainID"
              v-model="technicianMainID"
            />
          </v-flex>
          <v-flex md4 lg4>
            กรองใบงาน
            <v-layout row wrap>
              <v-checkbox v-model="notCancelJobSelect" label="ไม่แสดงยกเลิก" value="1"></v-checkbox>
              <v-checkbox v-model="dadJobTypeSelect" label="ไม่แสดงงานสร้าง" value="2"></v-checkbox>
            </v-layout>
          </v-flex>
          <v-flex md2 lg2>
            <v-btn round color="primary" @click="OK()">OK</v-btn>
          </v-flex>
        </v-layout>

        <v-flex md12 lg12>
          จำนวนทั้งหมด {{ total }} ใบงาน
          <ejs-grid
            ref="grid"
            id="Grid"
            :dataSource="jobs"
            :allowGrouping="true"
            :toolbar="toolbarOptions"
            height="272px"
            :allowExcelExport="true"
            :toolbarClick="toolbarClick"
          >
            <e-columns>
              <e-column field="RequestID" headerText="รหัส" width="150"></e-column>
              <e-column field="Damage" headerText="Urgent" width="120"></e-column>
              <e-column field="ReqTime" headerText="เวลาแจ้ง" width="160"></e-column>
              <!-- AppointmentDate -->
              <e-column field="AppointmentStart" headerText="เวลานัด" width="120"></e-column>
              <e-column field="StartTime2" headerText="เวลาเปิดงาน" width="160"></e-column>
              <e-column field="Status" headerText="สถานะ" width="120"></e-column>
              <!-- GetRepairePoint -->
              <e-column field="CompanyID" headerText="พื้นที่" width="120"></e-column>
              <e-column field="BuildingName" headerText="ตึก" width="120"></e-column>
              <e-column field="ZoneID" headerText="RM Group" width="150"></e-column>
              <e-column field="RMName" headerText width="RM"></e-column>
              <e-column field="TechnicianBelong" headerText="ทีมช่าง" width="120"></e-column>
              <!-- GetTechincalMain -->
              <e-column field="TechnicianMainName" headerText="ช่างหลัก" width="160"></e-column>
              <!-- GetTechincalSupport -->
              <e-column field="TechnicianMainName" headerText="ผู้ช่วย" width="120"></e-column>
              <e-column field="JobAccept" headerText="รับงาน" width="120"></e-column>
              <e-column field="JobFixed" headerText="ซ่อมเสร็จ" width="150"></e-column>
              <e-column field="FixedDetail" headerText="รายละเอียดการซ่อม" width="180"></e-column>
              <e-column field="JobTypeDescription" headerText="ชนิดงาน" width="120"></e-column>
              <e-column field="Description" headerText="รายละเอียด" width="180"></e-column>
              <e-column field="CustomerContract" headerText="ติดต่อ" width="120"></e-column>
              <e-column field="RequestChannel" headerText="แจ้งทาง" width="120"></e-column>
              <!-- SLA = p.SLA1.ToString("000") + "/" + p.SLA2.ToString("000"), -->
              <e-column field="SLA1" headerText="SLA" width="120"></e-column>

              <!-- ไม่พบใน DB -->
              <e-column field="usedTime1" headerText="ใช้เวลารับงาน" width="160"></e-column>
              <e-column field="usedTime2" headerText="ใช้เวลาซ่อม" width="150"></e-column>
              <e-column field="usedTime2Minute" headerText="ใช้เวลาซ่อมนาที" width="160"></e-column>
              <e-column field="SLA2Over" headerText="ใช้วเลาเกินSLA" width="180"></e-column>
              <e-column field="SLA2Status" headerText="เกินSLA" width="120"></e-column>
              <!-- ไม่พบใน DB -->

              <e-column field="Result3" headerText="ผลประเมิน" width="160"></e-column>
              <e-column field="DivisionName" headerText="ส่วนงานรับผิดชอบ" width="180"></e-column>
              <e-column field="DadJobType" headerText="ประเภทงาน" width="150"></e-column>

              <!--<e-column field="" headerText="" width="120"></e-column>-->
              <!--<e-column field="" headerText="" width="120"></e-column>-->
              <!--<e-column field="" headerText="" width="120"></e-column>-->
            </e-columns>
          </ejs-grid>
        </v-flex>
      </material-card>
    </v-flex>
  </v-container>
</template>


<script>
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { mapState } from "vuex";

//Grid จำเป็น
import {
  GridPlugin,
  Page,
  Sort,
  Group,
  Toolbar,
  ExcelExport
} from "@syncfusion/ej2-vue-grids";
import {
  DatePickerComponent,
  DatePickerPlugin
} from "@syncfusion/ej2-vue-calendars";

import { startOfDay, endOfDay, format } from "date-fns";

export default {
  components: {
    Treeselect,
    DatePickerPlugin,
    DatePickerComponent
  },

  data() {
    return {
      //For Render
      companys: null,
      RMGroups: null,
      technicianBelongs: null,

      statusSelect: null,
      companySelect: [],
      RMGroupIDSelect: null,
      technicianBelongSelect: null,
      jobFixed: null,
      damageSelect: null,

      dateChoiceSelect: {
        //วันแจ้งซ่อม
        dateChoiceID: "01",
        dateChoiceName: "วันแจ้งซ่อม"
      },
      startDate: new Date(),
      endDate: new Date(),
      dateFormat: "dd-MM-yyyy",

      requestID: null,
      technicianMainID: null,
      notCancelJobSelect: null,
      dadJobTypeSelect: null,

      //Grid
      total: 0,
      jobs: [],
      pageSettings: { pageSize: 10 },
      toolbarOptions: ["ExcelExport"]
    };
  },

  provide: {
    grid: [Page, Sort, Group, Toolbar, ExcelExport]
  },

  computed: {
    ...mapState("svd", [
      "jobStatus",
      // "company",
      // "RMGroup",
      // "technicianBelong",
      "repairsStatus",
      "damages",
      "dateChoice"
    ])
  },
  methods: {
    OK: function() {
      const { Job } = this.$FeathersVuex;
      const q = {};
      // q.$select = ["Priority", "ReqTime"];

      if (this.statusSelect != null) {
        if (this.statusSelect.statusID === "1x") {
          //รอ
          q.Status = {
            $in: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
          };
        } else if (this.statusSelect.statusID === "9x") {
          //ยกเลิก
          q.Status = { $in: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99] };
        } else {
          q.Status = { $in: [this.statusSelect.statusID] };
        }
      }

      if (this.companySelect.length > 0) {
        var x = [];
        var count = this.companySelect.length;

        for (var i = 0; i < count; i++) {
          x.push(this.companySelect[i].CompanyID);
        }

        q.CompanyID = { $in: x };
      }

      if (this.RMGroupIDSelect != null) {
        q.ZoneID = this.RMGroupIDSelect.ZoneID;
      }

      if (this.technicianBelongSelect != null) {
        q.TechnicianBelong = this.technicianBelongSelect.TechnicianBelongName;
      }

      if (this.jobFixed != null) {
        //ซ่อมไม่เสร็จ predicate = predicate.And(x => x.JobFixed != true || x.JobFixed.HasValue == false);
        q.JobFixed = this.jobFixed.status;
      }

      if (this.damageSelect != null) {
        if (this.damageSelect.damage == "01") {
          q.Damage = "2";
        } else if (this.damageSelect.damage == "02") {
          q.Priority = "2";
        }
      }

      if (
        this.dateChoiceSelect != null &&
        this.startDate != null &&
        this.endDate != null
      ) {
        var sDate = startOfDay(new Date(this.startDate));
        var eDate = endOfDay(new Date(this.endDate));

        var x = format(sDate, "YYYY-MM-DDTHH:mm:ss");
        var y = format(eDate, "YYYY-MM-DDTHH:mm:ss");

        if (this.dateChoiceSelect.dateChoiceID === "01") {
          //วันแจ้งซ่อม
          q.ReqTime = {
            $gt: x,
            $lt: y
          };
        } else if (this.dateChoiceSelect.dateChoiceID === "02") {
          //วันนัด
          q.AppointmentStart = {
            $gt: x,
            $lt: y
          };
        } else if (this.dateChoiceSelect.dateChoiceID === "03") {
          //วันปิดงาน
          q.StartTime2 = {
            $gt: x,
            $lt: y
          };
        }
      }

      if (this.requestID != null) {
        q.RequestID = this.requestID;
      }

      if (this.technicianMainID != null && this.technicianMainID != 0) {
        q.TechnicianMainID = Number(this.technicianMainID);
      }

      if (this.notCancelJobSelect != null) {
        //>=99
        //ไม่แสดงยกเลิก
        if (this.notCancelJobSelect === "1") {
          // q.Status.$nin = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
          q.Status = { $nin : [90, 91, 92, 93, 94, 95, 96, 97, 98, 99] };
        }
      }

      if (this.dadJobTypeSelect != null) {
        //predicate.And(x => x.DadJobType != "งานสร้าง" || x.DadJobType == null);
        if (this.dadJobTypeSelect === "2") {
          //q.DadJobType = "งานสร้าง";
          q.DadJobType = { $nin : ["งานสร้าง"] };
        }
      }

      q.$sort = {
        RequestID: -1
      };

      alert(JSON.stringify(q));
      Job.find({ query: q }).then(res => {
        console.log(JSON.stringify(res));
        this.total = res.total;
        this.jobs = res.data;
      });
    },

    testEmtiEventFromButton(value) {
      console.log(value);
    },

    //ExportExcel
    toolbarClick: function(args) {
      if (args.item.id === "Grid_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.excelExport();
      }
    }
  },
  mounted: function() {
    const { Company, Zone, TechnicianBelong } = this.$FeathersVuex;

    //Company
    Company.find().then(res => {
      this.companys = res.data;
    });

    //RMGroup
    Zone.find().then(res => {
      this.RMGroups = res.data;
    });

    //TechnicianBelong
    TechnicianBelong.find({ query: { Active: true } }).then(res => {
      this.technicianBelongs = res.data;
    });
  }
};
</script>