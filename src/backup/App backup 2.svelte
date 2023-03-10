<script lang="ts">
  import ListItems from "./components/ListItems.svelte";

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

  let isOpen = false
  let modalContainer;

  function handleOpen() {
    isOpen = true
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = '10px';
    // modalContainer.scrollTo(0, 0);
    // When the modal is shown, we want a fixed body
    // document.body.style.position = 'fixed';
    // document.body.style.top = `-${window.scrollY}px`;
  }


  function handleClose() {
    isOpen = false
    document.body.style.overflowY = "scroll";
    if (modalContainer) modalContainer.scrollTo(0,0)
    document.body.style.paddingRight = '0';
    // When the modal is hidden, we want to remain at the top of the scroll position
    // document.body.style.position = '';
    // document.body.style.top = '';
  }

  // handleOpen()

</script>

<main>
  <button 
    class="btn btn-add"
    on:click={handleOpen}
  >Добавить</button>
  <ListItems items={items} />

  <div 
    class="modal-wrapper"
    class:active={isOpen}
    bind:this={modalContainer}
  >
    <div class="test-wrapper">
      <div class="fixed">
        <div class="colors"></div>
      </div>
      <div class="modal">
        <div class="control">
          <button class="btn btn-close" on:click={handleClose}>Сохранить и закрыть</button></div>
        <div class="header"></div>
        <div class="editor"></div>
        <div class="content">
          <h2>Привет, бля</h2> 
          <div>
            Lorem 1 Lorem sum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodix error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodix error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodix error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodix error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodix error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.1 Lorem ipsum dolor sit amet consectetur adipisici aspernatur.ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.
          </div>
        </div>
      </div>
    </div>
  </div>
</main>



<style>
  .btn-add {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .modal-wrapper {
    position: fixed;
    width: 100%;
    height: calc(100vh - 20px);
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.25);
    display: flex;
    justify-content: center;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
    overflow-y: scroll;
    
    margin: 10px 0;
    /* align-items: center; */
  }
  .modal-wrapper.active {
    visibility: visible;
    opacity: 1;
  }

  .test-wrapper {
    width: 800px;
  }

  .fixed {
    background: none;
    color: #fff;
    width: 1000px;
    transform:translateX(-100px);
    height: 100px;

    position: fixed;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .colors {
    width: 100%;
    height: 80px;
    height: 100%;

    /* margin-bottom: 32px; */
    background: #888;
    
    border-radius: var(--border-raius-one);
   }

  .modal {
    padding: 130px 0 50px;
    background: none;
    border-radius: var(--border-raius-one);
    /* margin-bottom: 10px; */
   }



   .modal .control {
    width: 100%;
    height: 88px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ccc;
    border-radius: 0 0 var(--border-raius-one) var(--border-raius-one);
    margin-bottom: 2rem;
   }

   .modal .header,
   .modal .editor
    {
      height: 88px;
      padding: 12px;
      background: aqua;
    }

   .modal .header {
      background: #0abebe;
      border-radius: var(--border-raius-one) var(--border-raius-one) 0 0;
    }

    .modal .editor {
      /*  */
    }



   .modal .content {
      /* overflow-y: auto; */
      /* height: 600px; */
      padding: 12px;
      background: #eee;
      border-radius: 0 0 var(--border-raius-one) var(--border-raius-one);
      text-align: left;
      margin-bottom: 10px;
   }

   .btn-close {
    /* background: #fff;
    color: #242424; */
    }
</style>