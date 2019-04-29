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
                <v-flex md12 lg12>
                  <ejs-grid
                    ref="grid"
                    id="Grid"
                    :dataSource="report1"
                    :allowGrouping="false"
                    :toolbar="toolbarOptions"
                    :allowExcelExport="true"
                    :toolbarClick="toolbarClick"
                    :allowPaging="false"
                    :allowSorting="true"
                    :allowMultiSorting="true"
                  ></ejs-grid>
                </v-flex>
              </v-card>
            </v-tab-item>

            <v-tab-item>New แยกตามพื้นที่ส่วนกลาง
              <v-card flat>
                <v-flex md12 lg12>
                  รายงานแจ้งซ่อมแยกตามลูกค้า (พื้นที่ส่วนกลาง) ประจำปี : {{yearSelect}}
                  <span
                    v-if="monthShow != null"
                  >เดือน :</span>
                  {{ monthShow }}
                </v-flex>
                <v-flex md12 lg12>
                  <ejs-grid
                    ref="grid"
                    id="Grid"
                    :dataSource="report2"
                    :allowGrouping="false"
                    :toolbar="toolbarOptions"
                    :allowExcelExport="true"
                    :toolbarClick="toolbarClick"
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
                <v-flex>
                  ใบงานทั้งหมด {{report3Summary[0].ทั้งหมด}}
                  , ใบงานหลักทั้งหมด {{report3Summary[0].งานหลัก}}
                  , ใบงานช่วยทั้งหมด {{report3Summary[0].งานช่วย}}
                  , ใบงานไม่ใช่งานในขอบเขตทั้งหมด {{report3Summary[0].ไม่ใช่งานในขอบเขต}}
                </v-flex>
                <v-flex md12 lg12>
                  <ejs-grid
                    ref="grid"
                    id="Grid"
                    :dataSource="report3"
                    :allowGrouping="false"
                    :allowExcelExport="true"
                    :toolbarClick="toolbarClick"
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
              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="report4"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
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
              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="report5"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
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
              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="report6"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
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
              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="report7"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
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
                  ref="grid"
                  id="Grid"
                  :dataSource="report8"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
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
              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="report9"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
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
              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="report10"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                ></ejs-grid>
              </v-flex>
            </v-tab-item>
            <v-tab-item>
              จัดลำดับ
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
      //แยกตามลูกค้า (พื้นที่ส่วนส่วนกลาง)
      report2: null,
      //แยกตามพื้นที่
      report3: null,
      report3Summary: null,
      //แยกตามช่องทางการแจ้ง
      report4: null,
      //แยกตาม RM Group
      report5: null,
      //แยกตาม ทีมช่าง
      report6: null,
      //ผลการประเมิน Tablet ห้องน้ำ
      report7: null,
      //ผลการแจ้งซ่อมผ่าน Tablet ห้องน้ำ
      report8: null,
      //แยกตามสถานะ (RM Group)
      report9: null,
      //แยกตามสถานะ (ทีมช่าง)
      report10: null,

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
    toolbarClick(args) {
      if (args.item.id === "Grid_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.excelExport();
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
      //แยกตามลูกค้า (หน่วยงาน)
      this.$store
        .dispatch("reportbycustomer/find", { query: q })
        .then(res => {
          this.report1 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตามลูกค้า (พื้นที่ส่วนกลาง)
      this.$store
        .dispatch("reportbycustomer2/find", { query: q })
        .then(res => {
          this.report2 = res;
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
          this.report4 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตาม RM Group
      this.$store
        .dispatch("reportbyrmgroup/find", { query: q })
        .then(res => {
          this.report5 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตาม ทีมช่าง
      this.$store
        .dispatch("reportbytechnicianbelong/find", { query: q })
        .then(res => {
          this.report6 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //ผลการประเมิน Tablet ห้องน้ำ
      this.$store
        .dispatch("reportbytablet/find", { query: q })
        .then(res => {
          this.report7 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //ผลการแจ้งซ่อมผ่าน Tablet ห้องน้ำ
      this.$store
        .dispatch("reportbytablet2/find", { query: q })
        .then(res => {
          this.report8 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตามสถานะ (RM Group)
      this.$store
        .dispatch("reportbystatus/find", { query: q })
        .then(res => {
          this.report9 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตามสถานะ (ทีมช่าง)
      this.$store
        .dispatch("reportbystatus2/find", { query: q })
        .then(res => {
          this.report10 = res;
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
