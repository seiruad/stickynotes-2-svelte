<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { afterUpdate, onMount  } from 'svelte';
    import { colors } from '../data/data';
    import { generateID } from '../utils/utils';

    export let item;
    export let shouldOpen = false;

    const dispatch = createEventDispatcher();

    let modalContainer;
    let titleValue;
    let isErrorTitle;
    let isStartedTyping;
    let inputTitle
    let textValue
    let currentColor
    const maxTitleValue = 100

    function setDefault() {
        isErrorTitle = false
        isStartedTyping = false
        titleValue = item.title
        textValue = item.text
        currentColor = colors.find(c => c.id === item.color) 
        if (!currentColor) currentColor = 'defaultv1'
    }

    $: if (item) setDefault();     

    $: {
        if (titleValue.length > 0) {
            isStartedTyping = true  
        }
    }

    $: isErrorTitle = titleValue.length === 0 || titleValue.length > maxTitleValue


    function fireUpdate(item) {
        if (!item.id) item.id = generateID()
        if (!titleValue) {
            isErrorTitle = true
            return
        }
        item.title = titleValue;
        item.text = textValue;
        item.color = currentColor.id;
        setDefault();
        dispatch('update', {
            item
        });
    }

    function fireClose() {
        dispatch('close');
    }

    function open() {
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = '10px';
        window.setTimeout(() => {
            if(inputTitle) inputTitle.focus()
        }, 0);
    }
  
    function close() {
        document.body.style.overflowY = "scroll";
        if (modalContainer) modalContainer.scrollTo(0,0)
        document.body.style.paddingRight = '0';
    }

    function handleSave() {
        // close();
        isStartedTyping = true
        if (isErrorTitle) {
            inputTitle.focus();
            return
        }
        fireUpdate(item);
    }

    function handleClose() {
        // close();
        fireClose();
    }

    $: if (shouldOpen === true) {
        open();
    }

    $: if (shouldOpen === false) {
        close();
    }

    // onMount(() => {
    //     if (titleValue.length === 0) inputTitle.focus();
    // });

  

    function handlePickColor(e, pickedColor) {
        e.preventDefault();
        currentColor = pickedColor
    }
</script>
  
<main
    class="modal-container"
    class:active={shouldOpen}
    bind:this={modalContainer}
    style="--item-color: {currentColor?.value ? currentColor.value : 'rgba(103, 80, 164, .08)'}"
>
    <div class="modal">
        <div class="top">
            <div 
                class="titles"
                class:error={isErrorTitle && isStartedTyping}
            >
                <input 
                    class='title' 
                    type="text"
                    bind:value={titleValue}
                    bind:this={inputTitle}
                    placeholder={!isErrorTitle || !isStartedTyping ? "Введите заголовок для заметки" : 'Заполните заголовок'}
                >
                <div class="title-counter">{titleValue.length <= maxTitleValue ? titleValue.length : 'МАКС'}</div>
            </div>
            <div class="colors">
                {#each colors as color (color.id)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div 
                        class="a-color" 
                        style:background={color.value}
                        on:click={(e) => handlePickColor(e, color)} ></div>
                {/each}
            </div>
            <div class="editors">
                <button class="editor-save" on:click={handleSave}>Сохранить</button>
            </div>
        </div>
        <textarea 
            class="center textarea"
            bind:value={textValue}
        />
        <div class="bottom">
            <button class="bottom-close" on:click={handleClose}>Закрыть</button>
        </div>
    </div>
</main>
  
<style>
    .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        background-color: rgba(0,0,0,.15);
        opacity: 0;
        transition: opacity 0.3s;
        overflow-y: scroll;
    }

    .modal-container.active {
        visibility: visible;
        opacity: 1;
    }

    .modal {
        width: 600px;
        height: 606px;
        background: #FFFBFE;
        border-top: 6px solid var(--item-color);
        border-radius: var(--border-raius-one);
        /* box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .25); */
        overflow: hidden;

        /* transition: border .3s; */
    }

    .top {
        width: 100%;
        height: 180px;
        background: rgba(103, 80, 164, .05);
    }

    .center {
        width: 100%;
        height: 340px;
        padding: 16px;
        background: #FFFBFE;
        overflow-y: scroll;
    }

    .bottom {
        width: 100%;
        height: 80px;
        background: rgba(103, 80, 164, .05);
    }


    .colors,
    .editors,
    .titles {
        width: 100%;
        height: calc(100% / 3);
        padding: 10px;
        display: flex;
        background: none;
    }

    .editors {
        justify-content: flex-end;
    }

    .a-color {
        aspect-ratio: 1 / 1;
        /* width: 42px; */
        height: 100%;
        margin-right: 20px;
        display: inline-block;
        border: 1px solid #79747E;
        border-radius: 50%;
        cursor: pointer;
    }

    .editor-save {
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

    .titles {
        padding: 15px 10px;
    }

    .title {
        width: 90%;
        background: none;
        color: white;
        border: none;
        outline: none;
        color: #1C1B1F;
        font-size: 1.375rem;
    }

    .title::placeholder {
        color: #79747E;
    }



    .title-counter {
        padding-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #79747E;
        border-left: .5px solid #79747E;
        font-size: 1.375rem;
    }

    .error {
        background: #F9DEDC;
    }

    .error .title, 
    .error .title::placeholder,
    .error .title-counter {
        color: #B3261E;
        border-color: #B3261E;
    }


    .textarea {
        display: block;
        margin: 0;
        height: 340px;
        outline: none;
        border: none;
        resize: none;
        color: #1C1B1F;
        font-size: 1rem;
    }




    .bottom {
        padding: 22px 12px;
        display: flex;
        place-content: start;
    }

    .bottom-close {
        background: none;
        outline: none;
        color: #6750A4;
        border: none;
        font-size: 1rem;
        font-weight: 400;
        transition-property: background, box-shadow;
        transition-duration: .3s;
        padding: 0 24px;
    }

    .bottom-close:hover {
        background: rgba(255, 251, 254, .05);
        box-shadow: 0 4px 4px 0 rgba(0,0,0,.25);
    }
</style>