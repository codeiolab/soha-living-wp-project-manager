<template>
    <!-- panel header left column -->
    <div :class="headerMenuToggler">
        <div class="pm-tabs-collapse pm-visible-sm">
            <span class="menu-toggle dashicons dashicons-arrow-down-alt2" @click.prevent="headerMenuToggle()"></span>
        </div>
        <ul v-if="isFetchProjects" class="pm-tabs pm-list-inline">
            <li class="pm-tab-item pm-item-active">
                <router-link :to="{name: 'project_lists'}">
                    <!-- <i class=" pm-icon icon-pm-task-list"></i> -->
                    <span>{{ __( 'Active', 'wedevs-project-manager') }}</span>
                </router-link>
                <span v-if="activated" class="count">{{ __( `${activated}`, 'wedevs-project-manager') }}</span>
            </li>
            <li class="pm-tab-item pm-item-completed">
                <router-link :to="{name: 'completed_projects'}" class="pm-archive-project">
                    <!-- <i class="pm-icon flaticon-check-mark"></i> -->
                    <span>{{ __( 'Completed', 'wedevs-project-manager') }} </span> 
                </router-link>
                <span v-if="completed" class="count">{{ __( `${completed}`, 'wedevs-project-manager') }}</span>
            </li>
            <li class="pm-tab-item pm-item-favourite">
                <router-link :to="{name: 'favourite_projects'}">
                    <!-- <i class="pm-icon flaticon-bookmark-star"></i> -->
                    <span>{{ __( 'Favourite', 'wedevs-project-manager') }}</span>
                </router-link>
                <span v-if="favourite" class="count">{{ __( `${favourite}`, 'wedevs-project-manager') }}</span>
            </li>
            <li class="pm-tab-item pm-item-all">
                <router-link :to="{name: 'all_projects'}">
                    <!-- <i class="pm-icon flaticon-menu-1"></i> -->
                    <span>{{ __( 'All', 'wedevs-project-manager') }}</span>
                </router-link>
                <span v-if="allof" class="count">{{ __( `${allof}`, 'wedevs-project-manager') }}</span>
            </li>
            <!-- <li class="pm-tab-item pm-item-archive">
                <a href="#">
                    <i class="pm-icon flaticon-pm-archive"></i>
                    <span>Archive</span>
                </a>
            </li> -->
        </ul>
    </div>
</template>

<script>
    import Mixins from './mixin';

    export default {
        data () {
            return {
                headerMenuCollapsed: false,
            }
        },
        mixins: [Mixins],
        computed: {
            activated () {
                const prs = this.$store.state.projects.filter((item) => item.status === '0');
                return prs.length;
            },
            completed () {
                return this.$store.state.projects.length - this.activated;
            },
            allof () {
                 return  this.$store.state.projects.length;
            },
            favourite () {
                return this.$store.state.projects
                    .filter((item) => item.favourite)
                    .length;
            }
        },
        methods: {
            headerMenuToggle(){
                return this.headerMenuCollapsed = !this.headerMenuCollapsed;
            }
        }
    }
</script>

<style lang="less">
    .favourite-menu a{
        padding-left: 15px !important;
    }
    @media (max-width: 767px){
        .pm-panel-header {
            .pm-grid-row {
                position: relative;
                .pm-view-style-container {
                    margin: 0 -21px;
                }
            }
        }
        .pm-tabs-collapse {
            margin: 0 -20px;
            .menu-toggle {
                display: block;
                width: 100%;
                text-align: right;
                padding: 10px 15px; 
                min-height: 40px;
                cursor: pointer;
            }
        }
        #wedevs-project-manager ul.pm-tabs {
            margin: 0 -20px;
            li a  {
                border-bottom: 1px solid #e6e5e6;
            }
        }
        .pm-tabs-container {
            + .pm-col-6-sm {
                position: absolute;
                left: 0;
                top: 1px;
                width: calc(100% - 50px) !important;
                z-index: 1;
                form {
                    width: 100%;
                }
                form select {
                    min-height: 40px;
                    border-top: 0;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
            }
        }
        #pm-project-filters {
            select {
                width: 100%;
            }
        }
        .pm-panel-header .pm-view-style-container {
            padding: 0;
        }
        .pm-tabs-opened {
            + div {
                .pm-view-style-container {
                    padding-bottom: 15px;   
                }
                #pm-project-filters {
                    display: block;
                }
            }
            .pm-tabs-collapse{
                border-bottom: 1px solid #e1e1e1;
                .menu-toggle:before{
                    content: "\f343";
                }
            } 
        }
    }
</style>
