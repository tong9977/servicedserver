<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 lg12>
        <material-card color="orange" title="รายงาน RM">
          <div slot="menu" class="title"></div>
          <!-- <v-container px-0 py-0> -->
          <v-layout wrap>
            <v-flex md4 lg4>
              <v-card-text>
                <v-layout align-center>
                  <v-combobox
                    v-model="RMGroupIDSelect"
                    :items="RMGroups"
                    item-text="ZoneCode"
                    item-value="ZoneID"
                    label="เลือก RM Group"
                  ></v-combobox>
                </v-layout>
              </v-card-text>
            </v-flex>
            <v-flex md4 lg4>
              <v-card-text>
                <v-layout align-center>
                  <v-combobox v-model="yearSelect" :items="years" label="เลือกปี"></v-combobox>
                </v-layout>
              </v-card-text>
            </v-flex>

            <v-flex md4 lg4>
              <v-btn class="blue" @click="OK()">OK</v-btn>
            </v-flex>
          </v-layout>

          <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
            <v-tab>ภาพรวม</v-tab>
            <v-tab>แยกตามประเภทงาน</v-tab>

            <v-tab-item>
              <v-card flat>
                <v-flex md12 lg12>รายงานแจ้งซ่อม Zone : {{ RMGroupIDSelect.ZoneCode }} ประจำปี : {{yearSelect}}</v-flex>
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

            <v-tab-item>
              <v-card flat>
                <v-flex md12 lg12>รายงานแจ้งซ่อม Zone : {{ RMGroupIDSelect.ZoneCode }} ประจำปี : {{yearSelect}}</v-flex>
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
          </v-tabs>

          <!--</v-container> -->
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
      RMGroups: null,
      RMGroupIDSelect: {
          ZoneID : "01",
          ZoneCode : "Group 1"
      },
      years: [2019, 2018],
      yearSelect: [yyyy],

      zone: null,

      enabled: false,
      //Grid
      //pageSettings: { pageSize: 20 },
      toolbarOptions: ["ExcelExport"],
      //แยกตามลูกค้า (หน่วยงาน)
      report1: null,
      //แยกตามลูกค้า (พื้นที่ส่วนส่วนกลาง)
      report2: null,

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

      if (this.RMGroupIDSelect != null && this.yearSelect != null) {        
        q.zone = this.RMGroupIDSelect.ZoneID;
        q.year = this.yearSelect;
      }

      //ภาพรวม
      this.$store
        .dispatch("reportforrm1/find", { query: q })
        .then(res => {
          this.report1 = res;
        })
        .catch(error => {
          console.log(error);
        });

      //แยกตามประเภทงาน
      this.$store
        .dispatch("reportforrm2/find", { query: q })
        .then(res => {
          this.report2 = res;
        })
        .catch(error => {
          console.log(error);
        });
    },

    OK() {
      this.getData();
    }
  },
  mounted: function() {
    const { Zone } = this.$FeathersVuex;
    //RMGroup
    Zone.find().then(res => {
      this.RMGroups = res.data;
    });
    this.yearSelect = yyyy;

    this.getData();
  }
};
</script>
