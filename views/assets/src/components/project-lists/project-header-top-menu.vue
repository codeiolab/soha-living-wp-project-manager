<template>
    <!-- panel header left column -->
    <div class="pm-header-top-menu" :class="headerMenuToggler">
        <div class="pm-tabs-collapse pm-visible-sm">
            <span class="menu-toggle dashicons dashicons-arrow-down-alt2" @click.prevent="headerMenuToggle()"></span>
        </div>
        <ul class="pm-tabs pm-list-inline">
            <li class="pm-tab-item pm-item-active">
                <router-link :to="{name: 'project_lists'}">
                    <span>{{ __( 'Projects', 'wedevs-project-manager') }}</span>
                </router-link>
            </li>
            <li class="pm-tab-item pm-item-completed">
                <router-link to="#">
                    <span>{{ __( 'Tasks', 'wedevs-project-manager') }} </span> 
                </router-link>
            </li>
            <li class="pm-tab-item pm-item-favourite">
                <router-link to="#">
                    <span>{{ __( 'Calendar', 'wedevs-project-manager') }}</span>
                </router-link>
            </li>
            <li class="pm-tab-item pm-item-favourite">
                <router-link to="#">
                    <span>{{ __( 'Reports', 'wedevs-project-manager') }}</span>
                </router-link>
            </li>
            <li class="pm-tab-item pm-item-favourite">
                <router-link to="#">
                    <span>{{ __( 'Activity', 'wedevs-project-manager') }}</span>
                </router-link>
            </li>
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