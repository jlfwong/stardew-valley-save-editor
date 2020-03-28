<script>
	export let name;

	function processDroppedFile(file) {
		console.log("File", file)
	}

	function onDrop(ev) {
		ev.preventDefault()
		console.log("onDrop", ev)

		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (ev.dataTransfer.items[i].kind === 'file') {
					var file = ev.dataTransfer.items[i].getAsFile();
					processDroppedFile(file)
					return
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.files.length; i++) {
				processDroppedFile(ev.dataTransfer[i])
				return
			}
		}
	}

	function onDragOver(ev) {
		// TODO(jlfwong): Show drop indicator
		console.log("onDragOver", ev)
		ev.preventDefault()
	}
</script>

<main on:drop={onDrop} on:dragover={onDragOver}>
What's up
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
</style>