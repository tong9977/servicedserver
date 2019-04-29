<template>
  <v-toolbar dark app :color="color">
    <v-toolbar-title>
      <v-toolbar-side-icon @click="toggleNavigationBar"></v-toolbar-side-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      rating: null,
      dialog: false,
      dialogSettings: false,
      switchEmailNotification: true,
      showPassword: null,
      showPasswordConfirm: null,
      userEmail: null,
      password: null,
      passwordConfirm: null,
      error: false,
      showResult: false,
      result: "",
      items: [
        {
          icon: "account_circle",
          href: "#",
          title: "Profile",
          click: e => {}
        },
        {
          icon: "settings",
          href: "#",
          title: "Settings",
          click: () => {
            const vm = this;

            vm.dialogSettings = true;
          }
        },
        {
          icon: "exit_to_app",
          href: "#",
          title: "Log Out",
          click: () => {
            const vm = this;

            vm.$router.push({ name: "Login" });
          }
        }
      ],
      notifications: [
        {
          title: "New mail from Adam Joe",
          color: "light-blue",
          icon: "email",
          actionAt: "12 min ago",
          isActive: true,
          onClick: () => {
            const vm = this;

            vm.$router.push({ name: "Mailbox" });
          }
        },
        {
          title: "Scheculed meeting",
          color: "red",
          icon: "calendar_today",
          actionAt: "46 min ago",
          isActive: true,
          onClick: () => {
            const vm = this;

            vm.$router.push({ name: "Calendar" });
          }
        },
        {
          title: "New mail from Github",
          color: "light-blue",
          icon: "email",
          isActive: true,
          timeLabel: "2 hour ago",
          onClick: () => {
            const vm = this;

            vm.$router.push({ name: "Mailbox" });
          }
        }
      ]
    };
  },
  computed: {
    ...mapState("app", ["color"]),
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    toggleNavigationBar() {
      this.setDrawer(!this.$store.state.app.drawer);
    },

    setUpSettings() {
      const vm = this;

      if (
        vm.userEmail === null ||
        vm.password === null ||
        vm.passwordConfirm === null
      ) {
        vm.result = "Email and Password can't be null.";
        vm.showResult = true;

        return;
      }

      if (vm.password !== vm.passwordConfirm) {
        vm.error = true;
        vm.result = "Passwords does not match the confirm password.";
        vm.showResult = true;

        return;
      }

      vm.$root.userEmail = vm.userEmail;
      vm.$root.userPassword = vm.password;

      vm.result = "Email and password changed succesfully.";
      vm.showResult = true;

      vm.dialogSettings = false;
    }
  }
};
</script>
