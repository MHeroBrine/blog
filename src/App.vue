<template>
  	<div id="app">
    	<div class="sidebar_left">
			<v-Sidebar-left v-show="this.$store.state.global.SIDEBAR_INDEX"></v-Sidebar-left>
			<v-Sidebar-console v-show="this.$store.state.global.SIDEBAR_CONSOLE"></v-Sidebar-console>
		</div>
		<div class="container">
			<router-view />
		</div>
		<!-- <div class="cover" v-show="this.$store.state.global.COVER"> -->

		<!-- </div> -->
		<!-- <div class="sidebar_right">
			<v-Sidebar-right />
		</div> -->
  	</div>
</template>

<script>
	import Sidebar_left from './components/Sidebar/Sidebar_left'
	import Sidebar_console from './components/Sidebar/Sidebar_console'
	// import Sidebar_right from './components/Sidebar/Sidebar_right'

	export default {
		data() {
			return {}
		},
		components: {
			'v-Sidebar-left': Sidebar_left,
			'v-Sidebar-console': Sidebar_console,
			// 'v-Sidebar-right': Sidebar_right
		}
	}
</script>

<style lang="scss" scoped>
	#app {
		display: flex;
		height: 100vh;
		background-color: #EDF0F4;
		flex-direction: row;
		flex-wrap: wrap;
		overflow: hidden;
		.container {
			display: flex;
			height: 100vh;
			overflow: auto;
			flex: 1;
			flex-direction: column;
			::-webkit-scrollbar {
				width: 5px;;
			}
		}
		
	}

	@media screen and (max-width: 1024px) {
		.cover {
			position: fixed;
			opacity: 0.6;
			width: 100%;
			height: 100%;
			background-color: #000;
		}
	}
</style>
