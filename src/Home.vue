<template>
    <ul>
        <li>
            <router-link to="/sheets/new">Add a new sheet</router-link>
        </li>
        <li v-for="sheet in sheetList" :key="sheet.link">
            <router-link :to="sheet.link">{{sheet.name}}</router-link> 
            <a href="#" class="delete" @click.prevent="removeSheet(sheet)">[x]</a>
        </li>
    </ul>
</template>

<script>
export default {
    computed: {
        sheetList: function() {
            return this.$store.getters.sheetList.map(sheet=> {
                return {
                    uuid: sheet.uuid,
                    link: "/sheets/"+sheet.uuid,
                    name: sheet.name || "Unnamed sheet"
                }
            });
        }
    },
    methods: {
        removeSheet: function (sheet) {
            if (confirm(`Are you sure you want to delete sheet "${sheet.name}"?`)) {
                this.$store.commit("deleteSheet",{uuid:sheet.uuid});
            }
        }
    }
  
}
</script>

<style scoped>
</style>

