<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 lg12>
        <material-card color="orange" title="รายงานแจ้งซ่อมแยกตามพื้นที่">
          <div slot="menu" class="title"></div>
          <!-- <v-container px-0 py-0> -->
          <v-layout wrap>
            <v-flex md4 lg4>
              <v-card-text>
                <v-layout align-center>
                  <v-combobox v-model="yearSelect" :items="years" label="เลือกปี"></v-combobox>
                </v-layout>
              </v-card-text>
            </v-flex>
            <v-flex md4 lg4>
              <v-card-text>
                <v-layout align-center>
                  <v-checkbox v-model="enabled" hide-details class="shrink mr-2"></v-checkbox>
                  <v-combobox
                    :disabled="!enabled"
                    v-model="monthSelect"
                    :items="listMonth"
                    item-text="monthName"
                    item-value="monthID"
                    label="เลือกเดือน"
                  ></v-combobox>
                </v-layout>
              </v-card-text>
            </v-flex>
            <v-flex md4 lg4>
              <v-btn class="blue" @click="OK()">OK</v-btn>
            </v-flex>
          </v-layout>

          <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
            <v-tab>แยกตามลูกค้า (หน่วยงาน)</v-tab>
            <v-tab>แยกตามลูกค้า (พื้นที่ส่วนส่วนกลาง)</v-tab>
            <v-tab>แยกตามประเภทงาน</v-tab>
            <v-tab>แยกตามช่องทางการแจ้ง</v-tab>
            <v-tab>แยกตาม RM GROUP</v-tab>
            <v-tab>แยกตามทีมช่าง</v-tab>
            <v-tab>ผลการประเมิน Tablet ห้องน้ำ</v-tab>
            <v-tab>ผลการแจ้งซ่อมผ่าน Tablet ห้องน้ำ</v-tab>
            <v-tab>แยกตามสถานะ (RM Group)</v-tab>
            <v-tab>แยกตามสถานะ (ทีมช่าง)</v-tab>
            <v-tab>จัดเรียงลำดับ</v-tab>

            <v-tab-item>
              <v-card flat>
                <v-flex md12 lg12>
                  รายงานแจ้งซ่อมแยกตามลูกค้า (หน่วยงาน) ประจำปี : {{yearSelect}}
                  <span
                    v-if="monthShow != null"
                  >เดือน :</span>
                  {{ monthShow }}
                </v-flex>
                 <v-flex v-if="report1Summary != null">
                  ใบงานทั้งหมด {{report1Summary[0].ใบงาน}}
                  , ประเมินทั้งหมด {{report1Summary[0].ประเมิน}}
                  , ผลประเมินเฉลี่ยทั้งหมด {{report1Summary[0].ผลประเมินเฉลี่ย}}
                </v-flex>
                <v-flex md12 lg12>
                  <ejs-grid
                    ref="gridReport1"
                    id="GridReport1"
                    :dataSource="report1"
                    :allowGrouping="false"
                    :toolbar="toolbarOptions"
                    :allowExcelExport="true"
                    :toolbarClick="toolbarClickReport1"
                    :allowPaging="false"
                    :allowSorting="true"
                    :allowMultiSorting="true"
                  ></ejs-grid>
                </v-flex>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-flex md12 lg12>
                  รายงานแจ้งซ่อมแยกตามลูกค้า (พื้นที่ส่วนกลาง) ประจำปี : {{yearSelect}}
                  <span
                    v-if="monthShow != null"
                  >เดือน :</span>
                  {{ monthShow }}
                </v-flex>
                <v-flex v-if="report2Summary != null">
                  ใบงานทั้งหมด {{report2Summary[0].ใบงาน}}
                  , ประเมินทั้งหมด {{report2Summary[0].ประเมิน}}
                  , ผลประเมินเฉลี่ยทั้งหมด {{report2Summary[0].ผลประเมินเฉลี่ย}}
                </v-flex>
                <v-flex md12 lg12>
                  <ejs-grid
                    ref="gridReport2"
                    id="GridReport2"
                    :dataSource="report2"
                    :allowGrouping="false"
                    :toolbar="toolbarOptions"
                    :allowExcelExport="true"
                    :toolbarClick="toolbarClickReport2"
                    :allowPaging="false"
                    :allowSorting="true"
                    :allowMultiSorting="true"
                  ></ejs-grid>
                </v-flex>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-flex md12 lg12>
                  รายงานแจ้งซ่อมแยกตามประเภทงาน ประจำปี : {{yearSelect}}
                  <span
                    v-if="monthShow != null"
                  >เดือน :</span>
                  {{ monthShow }}
                </v-flex>
                <v-flex v-if="report3Summary != null">
                  ใบงานทั้งหมด {{report3Summary[0].ทั้งหมด}}
                  , ใบงานหลักทั้งหมด {{report3Summary[0].งานหลัก}}
                  , ใบงานช่วยทั้งหมด {{report3Summary[0].งานช่วย}}
                  , ใบงานไม่ใช่งานในขอบเขตทั้งหมด {{report3Summary[0].ไม่ใช่งานในขอบเขต}}
                </v-flex>
                <v-flex md12 lg12>
                  <ejs-grid
                    ref="gridReport3"
                    id="GridReport3"
                    :dataSource="report3"
                    :allowGrouping="false"
                    :toolbar="toolbarOptions"
                    :allowExcelExport="true"
                    :toolbarClick="toolbarClickReport3"
                    :allowPaging="false"
                    :allowSorting="true"
                    :allowMultiSorting="true"
                  ></ejs-grid>
                </v-flex>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-flex md12 lg12>
                รายงานแจ้งซ่อมแยกตามช่องทางการแจ้ง ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
              <v-flex v-if="report4Summary != null">
                  ใบงานทั้งหมด {{report4Summary[0].ใบงาน}}
                  , ประเมินทั้งหมด {{report4Summary[0].ประเมิน}}
                  , แจ้งทางเว็บ {{report4Summary[0].เว็บ}}
                  , แจ้งทาง Call Center {{report4Summary[0].CallCenter}}
                  , RM เป็นคนแจ้ง {{report4Summary[0].RM}}
                  , แจ้งผ่าน Tablet {{report4Summary[0].Tablet}}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport4"
                  id="GridReport4"
                  :dataSource="report4"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport4"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>

            <v-tab-item>
              <v-flex md12 lg12>
                รายงานแจ้งซ่อมแยกตาม RM Group ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
              <v-flex v-if="report5Summary != null">
                  เดินตรวจทั้งหมด {{report5Summary[0].เดินตรวจ}}
                  , ใบงานทั้งหมด {{report5Summary[0].ใบงาน}}
                  , ประเมินทั้งหมด {{report5Summary[0].ประเมิน}}
                  , รวมข้อที่ 1 {{report5Summary[0].ข้อ1}}
                  , รวมข้อที่ 2 {{report5Summary[0].ข้อ2}}
                  , รวมข้อที่ 3 {{report5Summary[0].ข้อ3}}
                  , คะแนนเฉลี่ยทั้งหมด {{report5Summary[0].คะแนนเฉลี่ย}}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport5"
                  id="GridReport5"
                  :dataSource="report5"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport5"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>

            <v-tab-item>
              <v-flex md12 lg12>
                รายงานแจ้งซ่อมแยกตามทีมช่าง ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
              <v-flex v-if="report6Summary != null">
                  ใบงานทั้งหมด {{report6Summary[0].ใบงาน}}
                  , ประเมินทั้งหมด {{report6Summary[0].ประเมิน}}
                  , รวมข้อที่ 1 {{report6Summary[0].ข้อ1}}
                  , รวมข้อที่ 2 {{report6Summary[0].ข้อ2}}
                  , รวมข้อที่ 3 {{report6Summary[0].ข้อ3}}
                  , คะแนนเฉลี่ยทั้งหมด {{report6Summary[0].คะแนนเฉลี่ย}}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport6"
                  id="GridReport6"
                  :dataSource="report6"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport6"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>

            <v-tab-item>
              <v-flex md12 lg12>
                รายงานการประเมิน Tablet ติดหน้าห้องน้ำ (Check Point) ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
              <v-flex v-if="report7Summary != null">
                  ใบงานทั้งหมด {{report7Summary[0].ใบงาน}}
                  , ประเมินทั้งหมด {{report7Summary[0].ประเมิน}}
                  , รวมข้อที่ 1 {{report7Summary[0].ข้อ1}}
                  , รวมข้อที่ 2 {{report7Summary[0].ข้อ2}}
                  , รวมข้อที่ 3 {{report7Summary[0].ข้อ3}}
                  , คะแนนเฉลี่ยทั้งหมด {{report7Summary[0].คะแนนเฉลี่ย}}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport7"
                  id="GridReport7"
                  :dataSource="report7"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport7"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>
            <v-tab-item>
              <v-flex md12 lg12>
                ผลการแจ้งซ่อมผ่าน Tablet ห้องน้ำ ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport8"
                  id="GridReport8"
                  :dataSource="report8"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport8"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>

            <v-tab-item>
               <v-flex md12 lg12>
               แยกตามสถานะ (RM Group) ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
              <v-flex v-if="report9Summary != null">
                  ใบงานทั้งหมด {{report9Summary[0].รวม}}
                  , อยู่ระหว่างดำเนินงานทั้งหมด {{report9Summary[0].อยู่ระหว่างดำเนินงาน}}
                  , ดำเนินการเรียบร้อยทั้งหมด {{report9Summary[0].ดำเนินการเรียบร้อย}}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport9"
                  id="GridReport9"
                  :dataSource="report9"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport9"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>

            <v-tab-item>
              <v-flex md12 lg12>
              แยกตามสถานะ (ทีมช่าง) ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
               <v-flex v-if="report10Summary != null">
                  ใบงานทั้งหมด {{report10Summary[0].รวม}}
                  , อยู่ระหว่างดำเนินงานทั้งหมด {{report10Summary[0].อยู่ระหว่างดำเนินงาน}}
                  , ดำเนินการเรียบร้อยทั้งหมด {{report10Summary[0].ดำเนินการเรียบร้อย}}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport10"
                  id="GridReport10"
                  :dataSource="report10"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport10"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>
            <v-tab-item>
              <v-flex md12 lg12>
              การจัดเรียงลำดับเรื่องแจ้งซ่อม ประจำปี : {{yearSelect}}
                <span
                  v-if="monthShow != null"
                >เดือน :</span>
                {{ monthShow }}
              </v-flex>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="gridReport11"
                  id="GridReport11"
                  :dataSource="report11"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClickReport11"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>
          </v-tabs>

          <!--</v-container> -->
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
  startOfDay,
  endOfDay,
  endOfMonth,
  lastDayOfYear,
  format
} from "date-fns";

var today = new Date();
var yyyy = today.getFullYear();
export default {
  data() {
    return {
      enabled: false,
      //Grid
      //pageSettings: { pageSize: 20 },
      toolbarOptions: ["ExcelExport"],
      //แยกตามลูกค้า (หน่วยงาน)
      report1: null,
      report1Summary: null,
      //แยกตามลูกค้า (พื้นที่ส่วนส่วนกลาง)
      report2: null,
      report2Summary: null,
      //แยกตามพื้นที่
      report3: null,
      report3Summary: null,
      //แยกตามช่องทางการแจ้ง
      report4: null,
      report4Summary: null,
      //แยกตาม RM Group
      report5: null,
      report5Summary: null,
      //แยกตาม ทีมช่าง
      report6: null,
      report6Summary: null,
      //ผลการประเมิน Tablet ห้องน้ำ
      report7: null,
      report7Summary: null,
      //ผลการแจ้งซ่อมผ่าน Tablet ห้องน้ำ
      report8: null,
      report8Summary: null,
      //แยกตามสถานะ (RM Group)
      report9: null,
      report9Summary: null,
      //แยกตามสถานะ (ทีมช่าง)
      report10: null,
      report10Summary: null,
      //10 อันดับ
      report11: null,
      report11Summary: null,

      years: [2019, 2018],
      yearSelect: [yyyy],

      listMonth: [
        {
          monthID: "01",
          monthName: "มกราคม"
        },
        {
          monthID: "02",
          monthName: "กุมภาพันธ์ "
        },
        {
          monthID: "03",
          monthName: "มีนาคม"
        },
        {
          monthID: "04",
          monthName: "เมษายน"
        },
        {
          monthID: "05",
          monthName: "พฤษภาคม"
        },
        {
          monthID: "06",
          monthName: "มิถุนายน"
        },
        {
          monthID: "07",
          monthName: "กรกฎาคม"
        },
        {
          monthID: "08",
          monthName: "สิงหาคม"
        },
        {
          monthID: "09",
          monthName: "กันยายน"
        },
        {
          monthID: "10",
          monthName: "ตุลาคม"
        },
        {
          monthID: "11",
          monthName: "พฤศจิกายน"
        },
        {
          monthID: "12",
          monthName: "ธันวาคม"
        }
      ],
      monthSelect: null,
      monthShow: null,

      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {},
  provide: {
    grid: [Page, Sort, Group, Toolbar, ExcelExport]
  },
  methods: {
    //ExportExcel
    toolbarClickReport1(args) {
      if (args.item.id === "GridReport1_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport1.excelExport();
      }
    },

    toolbarClickReport2(args) {
      if (args.item.id === "GridReport2_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport2.excelExport();
      }
    },

    toolbarClickReport3(args) {
      if (args.item.id === "GridReport3_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport3.excelExport();
      }
    },

    toolbarClickReport4(args) {
      if (args.item.id === "GridReport4_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport4.excelExport();
      }
    },

    toolbarClickReport5(args) {
      if (args.item.id === "GridReport5_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport5.excelExport();
      }
    },

    toolbarClickReport6(args) {
      if (args.item.id === "GridReport6_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport6.excelExport();
      }
    },

    toolbarClickReport7(args) {
      if (args.item.id === "GridReport7_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport7.excelExport();
      }
    },

    toolbarClickReport8(args) {
      if (args.item.id === "GridReport8_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport8.excelExport();
      }
    },

    toolbarClickReport9(args) {
      if (args.item.id === "GridReport9_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport9.excelExport();
      }
    },

    toolbarClickReport10(args) {
      if (args.item.id === "GridReport10_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport10.excelExport();
      }
    },

    toolbarClickReport11(args) {
      if (args.item.id === "GridReport11_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.gridReport11.excelExport();
      }
    },

    async getData() {
      const { Report } = this.$FeathersVuex;
      const q = {};

      if (this.yearSelect != null && this.enabled == false) {
        var day = this.yearSelect + "-01-01";
        var x = startOfDay(new Date(day));
        var y = lastDayOfYear(new Date(day));

        q.start = x;
        q.end = y;
      } else if (this.yearSelect != null && this.enabled == true) {
        var day = this.yearSelect + "-" + this.monthSelect.monthID + "-01";
        var x = startOfDay(new Date(day));
        var y = endOfMonth(new Date(day));

        q.start = x;
        q.end = y;
      }

      // q.start = "2019-04-01T00:00:00";
      // q.end = "2019-04-01T23:59:59";
      //1 แยกตามลูกค้า (หน่วยงาน)
      this.$store
        .dispatch("reportbycustomer/find", { query: q })
        .then(res => {
          this.report1 = res[0].data;
          this.report1Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //2 แยกตามลูกค้า (พื้นที่ส่วนกลาง)
      this.$store
        .dispatch("reportbycustomer2/find", { query: q })
        .then(res => {
          this.report2 = res[0].data;
          this.report2Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตามพื้นที่
      this.$store
        .dispatch("report/find", { query: q })
        .then(res => {
          this.report3 = res[0].data;
          this.report3Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตามช่องทางการแจ้ง
      this.$store
        .dispatch("reportbycanal/find", { query: q })
        .then(res => {
          this.report4 = res[0].data;
          this.report4Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตาม RM Group
      this.$store
        .dispatch("reportbyrmgroup/find", { query: q })
        .then(res => {
          this.report5 =  res[0].data;
          this.report5Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตาม ทีมช่าง
      this.$store
        .dispatch("reportbytechnicianbelong/find", { query: q })
        .then(res => {
          this.report6 = res[0].data;
          this.report6Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //ผลการประเมิน Tablet ห้องน้ำ
      this.$store
        .dispatch("reportbytablet/find", { query: q })
        .then(res => {
          this.report7 = res[0].data;
          this.report7Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //ผลการแจ้งซ่อมผ่าน Tablet ห้องน้ำ
      this.$store
        .dispatch("reportbytablet2/find", { query: q })
        .then(res => {
          this.report8 = res[0].data;
          this.report8Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตามสถานะ (RM Group)
      this.$store
        .dispatch("reportbystatus/find", { query: q })
        .then(res => {
          this.report9 = res[0].data;
          this.report9Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //10 แยกตามสถานะ (ทีมช่าง)
      this.$store
        .dispatch("reportbystatus2/find", { query: q })
        .then(res => {
          this.report10 =  res[0].data;
          this.report10Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });

      //11 10 อันดับ
      this.$store
        .dispatch("reporttop10/find", { query: q })
        .then(res => {
          this.report11 =  res[0].data;
          this.report11Summary = res[0].summary;
        })
        .catch(error => {
          console.log(error);
        });
    },

    OK() {
      if (this.monthSelect != null) {
        this.monthShow = this.monthSelect.monthName;
      }
      this.getData();
    }
  },
  mounted: function() {
    this.getData();

    this.yearSelect = yyyy;

    // var mm = today.getMonth() + 1;
    // this.monthShow = this.listMonth[mm - 1].monthName;
  }
};
</script>
