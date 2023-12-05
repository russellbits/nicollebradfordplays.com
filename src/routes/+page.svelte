<script>
	import '$lib/styles/house.scss';
	// import SocialLinks from '$lib/components/SocialLinks.svelte';
</script>

<main>
	<div class="logo">
		<img src="images/nicolle-alien.png" width="100" height="100" alt="Alien smiley face" />
	</div>
	<div class="avatar">
		<img src="images/bio-picture.png" width="400" height="400" alt="Nicolle Bradford Avatar" />
	</div>
	<h1>Nicolle Bradford Plays</h1>
	<h2>Hype Instigator</h2>
	<p>
		<!-- <SocialLinks /> -->
		<a href="https://pin.it/aYDLBjK">Pinterest</a> |
		<a href="https://www.facebook.com/nicollebradfordplays"
			><!--<i class="glyph-facebook glyph-white" />-->Facebook</a
		>
		|
		<a href="https://instagram.com/mymammasaidshop"
			><!--<i class="glyph-instagram glyph-white" />-->Instagram</a
		>
	</p>
</main>

<style>
	main {
		text-align: center;
		margin: auto;
	}
	.logo {
		position: absolute;
		top: 30px;
		left: 30px;
	}
	.avatar {
		padding: 1em;
	}
</style>
