<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import ItemContent from './ItemContent.svelte';
    import Item from './Item.svelte';
    import { API } from '../api/API';
    import ItemHeader from './ItemHeader.svelte';

    export let items;

    const dispatch = createEventDispatcher();

  
    let currentCard = -1
    let overCard = -1
  
    function swapCards(e) {
      let tempItems = items
      const relativePosition = defineRelativePosition(e)
      const diff = currentCard - overCard
      if (relativePosition === 1 && diff !== 1 || diff === -1 ) overCard += 1
      tempItems.splice(overCard,0,{...items[currentCard], moved: true ? items[currentCard]?.moved === false : false   })
      if (overCard <= currentCard) currentCard += 1
      tempItems.splice(currentCard,1)
  
      items = tempItems
    }
  
    function defineRelativePosition(e) {
      const currentX = e.clientX
      const currentY = e.clientY
      const currentEL = document.elementFromPoint(currentX, currentY).parentElement
  
      const H = currentEL.clientHeight 
      const W = currentEL.clientWidth
      const elRECT = currentEL.getBoundingClientRect();
      const elY = elRECT.y
      const elX = elRECT.x
      const relativePosition = (currentY - elY) / H
      if (relativePosition < 0.5) return -1
      return 1
    }
  
    function handleStart(e, i) {
      currentCard = i
      // setTimeout(() => {
      //   const el = e.target as HTMLElement
      //   el.style.display = 'none'
      // })
    }
  
    function handleEnd(e) {
      currentCard = -1
      overCard = -1
      // setTimeout(() => {
      //   const el = e.target as HTMLElement
      //   el.style.display = 'block'
      // })
    }
  
    function handleOver(e, i) {
      e.preventDefault()
      overCard = i
    }
  
    function handleLeave() {
      // overCard = -1
    }
  
    function handleDrop(e) {
      e.preventDefault()
      swapCards(e)
      dispatch('swap');
    }
  </script>
  
  
  <main>
    {#each items as { text, title, color, id, moved }, i (id)}
      <div class="wrapper"
        animate:flip={{duration: 400}}
        draggable={true}
        on:dragstart={(e) => {handleStart(e, i)}}
        on:dragleave={()=>handleLeave()}
        on:dragend={(e)=>handleEnd(e)}
        on:dragover={(e)=>handleOver(e, i)}
        on:drop={(e)=>handleDrop(e)}>
        {#key moved}
          <Item 
            isCurrent={currentCard === i}
            isOver={overCard === i && currentCard !== i}
            color={color} 
          >
            <!-- <div class="header">{title} <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z"/></svg></div> -->
            <ItemHeader on:edit id={id} title={title} />
            <ItemContent text={text} />
          </Item>
        {/key}
      </div>
    {/each}
  </main>
  
  
  <style>
  
    main {
      columns: 3;
      column-gap: 2rem; 
      margin: 0 auto;
      height: 100%;
    }
  
    .wrapper {
      width: 400px;
      min-height: 80px;
      background: none;
      break-inside: avoid;
      touch-action: none;
    }
  
    .header {
      font-weight: 700;
    }

    
    @media (max-width: 1300px) {
      main {
        columns: 2;
      }
    }
  
    @media (max-width: 1000px) {
      main {
        columns: 1;
        column-gap: 1rem; 
        margin: 0 auto;
        height: 100%;
      }
  
      .wrapper {
        width: auto;
        max-width: 400px;
        min-width: 200px;
      }
    }

  
  </style>