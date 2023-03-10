<script lang="ts">
  import ItemContent from "../components/ItemContent.svelte";
  import Item from "../components/Item.svelte";

  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  let items = [
    {
      id: '1',
      title: 'Первое',
      color: 'redv1',
      moved: false,
      text: '1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.'},
    {
      id: '2',
      title: 'Луковицы',
      color: 'defaultv1',
      text: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nisi distinc'},
    {
      id: '3',
      title: 'Супы',
      color: 'orange',
      text: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nisi distinc'},
    {
      id: '4',
      title: 'Столовые приборы',
      color: 'pink',
      text: '4 Lorem ipsum'},
    {
      id: '5',
      title: 'Напитки',
      color: '',
      text: '5 Lorem ipsum'},
    {
      id: '6',
      title: 'Десерт',
      color: 'premium',
      text: '6 Obcaecati Obcaecati nisi distinc nisi quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.'},
    {
      id: '7',
      title: 'Помидоры',
      color: 'blue',
      text: '7 Obcaecati nisi'},
    {
      id: '8',
      title: 'Салаты',
      color: 'greenv1',
      text: '8 Lorem ipsum Lorem ipsum Obcaecati nisi'},
    {
      id: '9',
      title: 'Закуски',
      color: 'yellow',
      text: '9 Вкусные закусочки'},
  ]

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
  }
</script>


<main>
  {#each items as { text, title, color, id, moved }, i (id)}
    <div class="wrapper"
      animate:flip={{duration: 400}}
      draggable="true"
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
          <div class="header">{title}</div>
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
    background: none;
    break-inside: avoid;
    touch-action: none;
  }

  .header {
    font-weight: 700;
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