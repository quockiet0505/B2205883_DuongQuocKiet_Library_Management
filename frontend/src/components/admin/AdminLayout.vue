<template>
     <div class="admin-layout">
          <AppHeader />
          <main class="content">
               <slot />
          </main>
          <AppFooter />
     </div>
</template>

<script>
     import AppHeader from "@/components/admin/AppHeader.vue";
     import AppFooter from "@/components/admin/AppFooter.vue";

     export default {
          name: "AdminLayout",
          components: { AppHeader, AppFooter },
     };
</script>

<style scoped>
.admin-layout {
     min-height: 100vh;
     display: flex;
     flex-direction: column;
     padding-top: 100px;
}

.content {
     flex: 1 0 auto;
     padding: 20px;
}

</style>