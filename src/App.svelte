<script>
	import {handleFileDrop} from './parser.ts';

	let isDragging = false

	function onDrop(ev) {
		isDragging = false
		handleFileDrop(ev)
	}

	function onDragOver(ev) {
		isDragging = true
		ev.preventDefault()
	}

	function onDragEnd(ev) {
		isDragging = false
	}
</script>

<main on:drop={onDrop} on:dragover={onDragOver} on:dragend={onDragEnd} class={isDragging ? "isDragging" : ""}>
Drop file here
</main>

<style>
	:global(html), :global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	main {
		text-align: center;
		border: 1px solid red;
		height: 100vh;
		width: 100vw;
	}

	.isDragging {
		outline: 3px solid blue;
	}
</style>