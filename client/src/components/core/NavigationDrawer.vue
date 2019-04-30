<template>
  <v-navigation-drawer v-model="inputValue" fixed app>
    <v-toolbar flat dark :color="color" class="toolbar">
      <router-link :to="{ name: 'Dashboard' }" class="text">Vue Admin Template</router-link>
    </v-toolbar>
    <v-list>
      
      <v-list-tile @click="changeRoute('Home', 1)">
        <v-list-tile-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 1}, 'item-title' ]">Home</v-list-tile-title>
      </v-list-tile>

       <v-list-group prepend-icon="mdi-calendar">
        <v-list-tile slot="activator">
          <v-list-tile-title class="item-title">Report</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('Report', 2)">
          <v-list-tile-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">ภาพรวม</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('ReportRM', 3)">
          <v-list-tile-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 3}, 'item-title' ]">RM</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('ReportTechnicianBelong', 4)">
          <v-list-tile-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 4}, 'item-title' ]">ทีมช่าง</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('ReportTechnicianBelongPerson', 5)">
          <v-list-tile-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 5}, 'item-title' ]">ทีมช่าง (แยกตามบุคคล)</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      selectedIndex: 1,
      admins: [["Management", "people_outline"], ["Settings", "settings"]]
    };
  },
  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  methods: {
    ...mapMutations("app", ["setDrawer"]),
    changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    }
  },
  mounted() {}
};
</script>

<style>
.toolbar {
  font-weight: bold;
  font-size: 18px;
}

.toolbar .text {
  padding-left: 15px;
  color: white;
  text-decoration: none;
}

.item-title {
  font-size: 17px;
  font-weight: 500;
}
.item-sub-title {
  font-size: 15px;
  font-weight: 500;
}

.active {
  font-weight: bold;
}
</style>
