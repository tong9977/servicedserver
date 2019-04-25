<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 lg12>
        <material-card color="orange" title="รายงานแจ้งซ่อมแยกตามพื้นที่">
          <div slot="menu" class="title"></div>
          <v-container px-0 py-0>
            <v-layout wrap>
              <v-flex md4 lg4>
                <v-card-text>
                  <v-layout align-center>
                    <v-combobox
                      v-model="yearSelect"
                      :items="years"
                      label="เลือกปี"
                    ></v-combobox>
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

              <div>
                <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
                  <v-tab v-for="n in 3" :key="n" ripple>รายงานแจ้งซ่อม {{ n }}</v-tab>
                  <v-tab-item v-for="n in 3" :key="n">
                    <v-card flat v-if="n === 1">
                      <v-flex md12 lg12>
                        รายงานแจ้งซ่อมแยกตามลูกค้า ประจำปี : {{yearSelect}}
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
                    <v-card flat v-if="n === 2">
                      <v-flex md12 lg12>
                        รายงานแจ้งซ่อมแยกตามพื้นที่ ประจำปี : {{yearSelect}}
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

                    <v-card flat v-if="n === 3">
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
                          :dataSource="report3"
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
                </v-tabs>
              </div>
            </v-layout>
          </v-container>
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
      //แยกตามลูกค้า
      report1: null,
      //แยกตามพื้นที่
      report2: null,
      //แยกตามช่องทางการแจ้ง
      report3: null,

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
        var sDate = startOfDay(new Date(day));
        var eDate = lastDayOfYear(new Date(day));

        var x = format(sDate, "YYYY-MM-DDT00:00:00");
        var y = format(eDate, "YYYY-MM-DDT23:59:59");

        q.start = x;
        q.end = y;
      } else if (this.yearSelect != null && this.enabled == true) {
        var day = this.yearSelect + "-" + this.monthSelect.monthID + "-01";
        var sDate = startOfDay(new Date(day));
        var eDate = endOfMonth(new Date(day));

        var x = format(sDate, "YYYY-MM-DDT00:00:00");
        var y = format(eDate, "YYYY-MM-DDT23:59:59");

        q.start = x;
        q.end = y;
      }

      // q.start = "2019-04-01T00:00:00";
      // q.end = "2019-04-01T23:59:59";
      this.$store
        .dispatch("reportbycustomer/find", { query: q })
        .then(res => {
          this.report1 = res;
        })
        .catch(error => {
          console.log(error);
        });

      this.$store
        .dispatch("report/find", { query: q })
        .then(res => {
          this.report2 = res;
        })
        .catch(error => {
          console.log(error);
        });

      // this.$store
      //   .dispatch("reportbycanal/find", { query: q })
      //   .then(res => {
      //     this.report3 = res;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
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
