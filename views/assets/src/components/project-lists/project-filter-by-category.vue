<template>
    <form action="" method="get" class="pm-filter-selection" id="pm-project-filters">
        <select @change="categoryFilter()" v-model="categorie_id" class="form-control">
            <option value="-1">
                {{ __( 'All Categories', 'wedevs-project-manager') }}
            </option>
            <option v-for="categorie in categories" :value="categorie.id" :key="categorie.id">
                {{ categorie.title }}
            </option>
        </select>
        <i class="bb-icon-angle-down bb-icon-l"></i>
    </form>
</template>

<script>
    export default {
        data () {
            return {
                categorie_id: typeof this.$route.query.category === 'undefined' 
                    ? '-1' : this.$route.query.category
            }
        },
        computed: {
            categories () {
                var categoriesUnsorted = this.$root.$store.state.categories;
                var sortedIndexes = Object.keys(categoriesUnsorted).sort((a, b) => {
                    return categoriesUnsorted[a].title.localeCompare(categoriesUnsorted[b].name);
                });
                var categoriesSorted = sortedIndexes.map(function(id) {
                    return categoriesUnsorted[id];
                });

                return categoriesSorted;
            }
        },
        methods: {
            categoryFilter () {
                var self = this;
                var extra_ele = {
                    category: self.categorie_id === '-1' ? false : self.categorie_id,
                    with: 'assignees',
                    project_meta: 'all',
                    orderby: 'id:desc',
                }

                // var setQuery = this.setQuery(extra_ele);

                this.$router.push({
                    query: extra_ele
                });
            }
        }
    } 
</script>
