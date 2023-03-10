<script lang="ts">
    import { onMount } from "svelte";
    import { API } from "./api/API";
  import ListItems from "./components/ListItems.svelte";
    import Modal from "./components/Modal.svelte";

  // let items = [
  //   {
  //     id: '1',
  //     title: 'Первое',
  //     color: 'redv1',
  //     moved: false,
  //     text: '1 Lorem ipsum dolor sit amet consectetur adipisicing esit amet consectetur adipisicing elit. Obcaecati nisi distinctio ipsum sequi expedita necessitatibus, temporibus quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.'},
  //   {
  //     id: '2',
  //     title: 'Луковицы',
  //     color: 'defaultv1',
  //     text: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nisi distinc'},
  //   {
  //     id: '3',
  //     title: 'Супы',
  //     color: 'orange',
  //     text: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nisi distinc'},
  //   {
  //     id: '4',
  //     title: 'Столовые приборы',
  //     color: 'pink',
  //     text: '4 Lorem ipsum'},
  //   {
  //     id: '5',
  //     title: 'Напитки',
  //     color: '',
  //     text: '5 Lorem ipsum'},
  //   {
  //     id: '6',
  //     title: 'Десерт',
  //     color: 'premium',
  //     text: '6 Obcaecati Obcaecati nisi distinc nisi quisquam officia commodi quaerat, eum ex error id nam inventore nihil fuga, minus aspernatur.'},
  //   {
  //     id: '7',
  //     title: 'Помидоры',
  //     color: 'blue',
  //     text: '7 Obcaecati nisi'},
  //   {
  //     id: '8',
  //     title: 'Салаты',
  //     color: 'greenv1',
  //     text: '8 Lorem ipsum Lorem ipsum Obcaecati nisi'},
  //   {
  //     id: '9',
  //     title: 'Закуски',
  //     color: 'yellow',
  //     text: '9 Вкусные закусочки'},
  // ]

  let items = [];

  let isModalOpen = false
  let modalContainer;

  // localStorage.setItem('stockynotes-notes', JSON.stringify(items))


  let itemToModal;

  function setItemToModalToDefault() {
    itemToModal = {
      id: '',
      title: '',
      color: '',
      text: '',
    }
  }

  setItemToModalToDefault();

  function openModal() {
    isModalOpen = true;    
  }

  function handleAdd() {
    openModal();
  }

  function handleEdit(e) {
    if (!e || !e.detail.id) return
    itemToModal = items.find(item => item.id === e.detail.id);
    if (!itemToModal) {
      setItemToModalToDefault();
      return
    }
    openModal();
  }

  function handleModalUpdate(e) {
    if (e.detail.item && e.detail.item.title && e.detail.item.id) {
      const existedItem = items.find(item => item.id === e.detail.item.id);
      if (existedItem) {
        items = items.map(item => item.id === e.detail.item.id ? e.detail.item : item);
      } else {
        items = [e.detail.item ,...items];
      }
    }

    isModalOpen = false; 
    setItemToModalToDefault();
    itemToModal = itemToModal;
    API.saveAllItems(items);
  }

  function handleModalClose() {
    isModalOpen = false;
  }

  function handleSwap(e) {
    API.saveAllItems(items)    
  }

  // handleOpen()


  onMount(async () => {
		const resItems = await API.getAllItems()
		items = resItems
	});



</script>

<main>
  <button 
    class="btn btn-add"
    on:click={handleAdd}
  >Добавить</button>

  <ListItems 
    items={items} 
    on:swap={handleSwap}
    on:edit={handleEdit}
  />

  <Modal 
    shouldOpen={isModalOpen} 
    item={itemToModal} 
    on:update={handleModalUpdate}
    on:close={handleModalClose}
  />
</main>



<style>
  .btn-add {
    margin-top: 1rem;
    margin-bottom: 2rem;

    padding: 10px 12px;
    display: inline-block;
    background: #6750A4;
    color: #fff;
    border: none;
    outline: none;
    text-align: center;
    text-decoration: none;
    font-weight: 400;
    font-size: 1rem;
  }
</style>