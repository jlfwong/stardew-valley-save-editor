<script>
  import {handleFileDrop} from './parser.ts';

  let isDragging = false
  let saveGame = null

  function onDrop(ev) {
    isDragging = false
    handleFileDrop(ev, (droppedSaveGame) => {
      saveGame = droppedSaveGame
      window.saveGame = saveGame
    })
  }

  function onDragOver(ev) {
    isDragging = true
    ev.preventDefault()
  }

  function onDragEnd(ev) {
    isDragging = false
  }

  function onButtonClick() {
    saveGame.getHost().setMoney(99999)

    saveGame = saveGame
  }

  function download() {
    saveGame.download()
  }
</script>

<main on:drop={onDrop} on:dragover={onDragOver} on:dragend={onDragEnd} class={isDragging ? "isDragging" : ""}>
{#if saveGame != null}
  <button on:click={onButtonClick}>MONEY!</button>
  <button on:click={download}>Download</button>
  {saveGame.getHost().getMoney()}
{:else}
  Drop file here
{/if}
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
    border: 3px solid blue;
  }
</style>