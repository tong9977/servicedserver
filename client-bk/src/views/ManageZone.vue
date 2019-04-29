<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 lg12>
        <material-card color="orange" title="จัดการ RM Group">
          <div slot="menu" class="title">
            <!-- POPUP-->

            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn flat dark v-on="on">
                  <v-icon>mdi-plus</v-icon>เพิ่ม
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>เพิ่ม RM Group</v-card-title>
                <v-card-text>
                  <v-text-field
                    label="รายละเอียดโซน"
                    placeholder="กรอกรายละเอียด"
                    v-model="Descriptions"
                  ></v-text-field>
                  <v-text-field
                    label="ตำแหน่ง"
                    placeholder="กรอกตำแหน่งที่ตั้ง"
                    v-model="Location"
                  ></v-text-field>
                  <v-text-field
                    label="Zone Code"
                    placeholder="กรอก Zone Code"
                    v-model="ZoneCode"
                  ></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="dialog = false">Cancel</v-btn>
                  <v-btn color="primary" flat @click="SaveZone">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!--end popup-->
          </div>

          <v-container px-0 py-0>
            <v-layout wrap>
              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="RMGroups"
                  :allowGrouping="true"
                  :toolbar="toolbarOptions"
                  height="272px"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
                  :allowPaging="true"
                  :pageSettings="pageSettings"
                >
                  <e-columns>
                    <e-column field="ZoneID" headerText="รหัส" width="150"></e-column>
                    <e-column field="Descriptions" headerText="รายละเอียด" width="120"></e-column>
                    <e-column field="Location" headerText="ตำแหน่ง" width="160"></e-column>
                    <e-column field="ZoneCode" headerText="Zone Code" width="160"></e-column>
                    <e-column field="mdi-folder-edit-outline" headerText="Edit" width="160"><v-icon>mdi-folder-edit-outline</v-icon></e-column>
                  </e-columns>
                </ejs-grid>
              </v-flex>
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
export default {
  data() {
    return {
      //Grid
      pageSettings: { pageSize: 20 },
      toolbarOptions: ["ExcelExport"],
      RMGroups: null,

      dialog : false,

      Descriptions:null,
      Location:null,
      ZoneCode:null,
    };
  },
  provide: {
    grid: [Page, Sort, Group, Toolbar, ExcelExport]
  },
  methods: {
    //ExportExcel
    toolbarClick: function(args) {
      if (args.item.id === "Grid_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.excelExport();
      }
    },

    SaveZone:function(){
      this.dialog = false;
      alert(this.Descriptions + " " + this.Location + " " + this.ZoneCode);
      const { Zone } = this.$FeathersVuex;

      Zone.create(data, params).then(res => {
       return Promise.resolve(data);
      });
      
    }
  },
  mounted: function() {
    const { Zone } = this.$FeathersVuex;

    //RMGroup
    Zone.find().then(res => {
      this.RMGroups = res.data;
    });
  }
};
</script>
