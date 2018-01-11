<template>
    <ul>
        <li>
            <router-link to="/sheets/new">Add a new sheet</router-link>
        </li>
        <li v-for="sheet in sheetList" :key="sheet.link">
            <router-link :to="sheet.link">{{sheet.name}}</router-link>
        </li>
    </ul>
  
</template>

<script>
export default {
    computed: {
        sheetList: function() {
            return this.$store.getters.sheetList.map(sheet=> {
                return {
                    link: "/sheets/"+sheet.uuid,
                    name: sheet.name || "Unnamed sheet"
                }
            });
        }
    }
  
}
</script>

<style scoped>

</style>

