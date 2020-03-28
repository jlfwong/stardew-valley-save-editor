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

  function download() {
    saveGame.download()
  }

  function onMoneyChange(ev) {
    const value = parseInt(ev.target.value)
    if (!isNaN(value)) {
      saveGame.getHost().setMoney(value)
      saveGame = saveGame
    }
  }
</script>

<main on:drop={onDrop} on:dragover={onDragOver} on:dragend={onDragEnd} class={isDragging ? "isDragging" : ""}>
{#if saveGame != null}
  <div>
    Money: <input type="text" value={saveGame.getHost().getMoney()} on:input={onMoneyChange}/>
  </div>
  <button on:click={download}>Download</button>
  <div>
    After downloading, replace the file you dropped with the one you downloaded (but back it up first!)
  </div>
{:else}
  Drop your save file here.
  <div>
    On macOS, you should find your save file somewhere like <code>/Users/(YOUR USERNAME)/.config/StardewValey/Saves/(YOUR NAME)_###/(YOUR NAME)_###</code>.
  </div>
  <div>
    For example, mine is at <code>/Users/jlfwong/.config/StardewValue/Saves/Jamie_244353258/Jamie_2344353258</code>.
  </div>
  <div>
    If you can't find that directory in Finder, try opening the terminal and running <code>open ~/.config/StarDewValley/Saves</code>
  </div>
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
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .isDragging {
    border: 3px solid blue;
  }
</style>