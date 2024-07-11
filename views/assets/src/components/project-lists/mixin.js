export default {
	data () {
		return {

		}
	},
	computed: {
        ...pm.Vuex.mapState('projectLists',
            {
                projects_view: state => state.projects_view,
            }
        ),

        isFetchProjects () {
        	return this.$store.state.projectLists.isFetchProjects;
        }
    },
	methods: {

        activeClass(view){
            if ( view == this.projects_view ) {
                return view;
            }
            
            //return this.$store.state.projects_view === view;
        },

		projects_view_class (){
            return 'grid_view' === this.projects_view ? 'pm-project-grid': 'pm-project-list'
        },

        projectFetchStatus (status) {
        	this.$store.commit( 'projectLists/projectFetchComplete', status );
        },

        projectOrder (orders) {
            var self = this;
            
            var request_data = {
                url: self.base_url + 'pm/v2/projects/sorting',
                type: 'POST',
                data: orders,
                success (res) {
                },
                error (res) {
                }
            }

            self.httpRequest(request_data);
        },
	}
}
